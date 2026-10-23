// Client for an OpenAI-compatible chat completions API, such as
// llama.cpp-server. Zero dependencies: uses the built-in fetch of Node 18+.

import fs from 'node:fs';
import path from 'node:path';

import { sleep } from './util.js';

export class LlmError extends Error {
  constructor(message, { kind = 'http', cause } = {}) {
    super(message);
    this.name = 'LlmError';
    this.kind = kind; // 'network' | 'http' | 'parse'
    this.cause = cause;
  }
}

const RETRIES = 3;
// Tool results fed back into the conversation are truncated to this size, so
// that many tool rounds cannot exhaust the model's context window.
const MAX_TOOL_RESULT_CHARS = 6000;

// Choose the model and token budget from a /v1/models listing.
// llama.cpp's router mode lists every model it could load with a
// status.value ("unloaded" / "loaded"); a plain single-model server lists
// exactly its loaded model, without a status. Among the loaded models the
// biggest one wins (meta.size), and its runtime context (meta.n_ctx, the
// actual --ctx-size the server was launched with, smaller than the trained
// context_length when VRAM is limited) becomes the completion budget.
function budgetOf(entry) {
  return Number(entry?.meta?.n_ctx ?? entry?.context_length) || undefined;
}

export function pickModelAndBudget(entries) {
  const list = Array.isArray(entries) ? entries : [];
  if (list.length === 0) {
    return { model: null, maxTokens: undefined, noneLoaded: [], ambiguous: false };
  }
  const withStatus = list.filter(
    (entry) => entry?.status && typeof entry.status.value === 'string',
  );
  if (withStatus.length === 0) {
    return {
      model: String(list[0].id),
      maxTokens: budgetOf(list[0]),
      noneLoaded: [],
      ambiguous: list.length > 1,
    };
  }
  const loaded = withStatus.filter((entry) => entry.status.value !== 'unloaded');
  if (loaded.length === 0) {
    return {
      model: null,
      maxTokens: undefined,
      noneLoaded: list.map((entry) => String(entry.id)),
      ambiguous: false,
    };
  }
  let best = loaded[0];
  let bestSize = Number(loaded[0]?.meta?.size ?? -1);
  for (const entry of loaded.slice(1)) {
    const size = Number(entry?.meta?.size ?? -1);
    if (size > bestSize) {
      bestSize = size;
      best = entry;
    }
  }
  return {
    model: String(best.id),
    maxTokens: budgetOf(best),
    noneLoaded: [],
    ambiguous: loaded.length > 1,
  };
}

export class LlmClient {
  constructor(config, logger = () => {}) {
    this.config = config;
    this.logger = logger;
    this.model = config.model || null;
    this.modelResolved = this.model !== null;
    this.omitModel = false;
    this.autoMaxTokens = undefined;
    // State of the last completed chat call, for diagnostics.
    this.lastFinishReason = null;
    this.lastUsage = null;
    this.lastReasoning = null;
    this.debugStream = null;
  }

  // Append one JSON line to the debug transcript. Best-effort: transcript
  // problems must never break the agent itself.
  transcribe(entry) {
    if (!this.config.debug) return;
    try {
      if (this.debugStream === null) {
        fs.mkdirSync(path.dirname(this.config.debugLogPath), { recursive: true });
        this.debugStream = fs.createWriteStream(this.config.debugLogPath, { flags: 'a' });
      }
      this.debugStream.write(JSON.stringify({ t: new Date().toISOString(), ...entry }) + '\n');
    } catch {
      // ignore transcript failures
    }
  }

  // Resolve the model once, at setup. Auto-resolution (asking the server
  // which model it has loaded) only happens when neither OPENAI_MODEL nor
  // OPENAI_HOST are set: explicitly configured servers are used as-is.
  // With several models listed and none loaded, the agent fails with the
  // available ids instead of guessing (guessing made routers load the
  // wrong model).
  async resolveModel() {
    if (this.modelResolved) return;
    this.modelResolved = true;
    if (this.model !== null) return; // OPENAI_MODEL: use verbatim.
    if (!this.config.autoResolveModel) {
      this.omitModel = true; // OPENAI_HOST set: let the server pick its model.
      return;
    }
    let entries = null;
    try {
      const res = await fetch(`${this.config.host}/v1/models`, {
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const data = await res.json();
        entries = Array.isArray(data?.data) ? data.data : [];
      }
    } catch {
      // leave entries null: /v1/models unavailable
    }
    if (entries === null) {
      this.omitModel = true;
      return;
    }
    const pick = pickModelAndBudget(entries);
    if (pick.model === null) {
      throw new LlmError(
        `the server lists several models and none is loaded; load one first, or set OPENAI_MODEL to one of: ${pick.noneLoaded.join(', ')}`,
        { kind: 'http' },
      );
    }
    this.model = pick.model;
    this.autoMaxTokens = pick.maxTokens;
    if (pick.ambiguous) {
      this.logger(`several models available; using ${this.model}`);
    }
  }

  async chat(messages, { temperature, maxTokens, label } = {}) {
    await this.resolveModel();
    const body = {
      messages,
      temperature: temperature ?? this.config.temperature,
      stream: false,
    };
    if (this.config.reasoningFormat) body.reasoning_format = this.config.reasoningFormat;
    if (this.model && !this.omitModel) body.model = this.model;
    const tokens = maxTokens ?? this.config.maxTokens ?? this.autoMaxTokens;
    if (tokens) body.max_tokens = tokens;

    let lastError;
    for (let attempt = 0; attempt < RETRIES; attempt++) {
      if (attempt > 0) await sleep(500 * 2 ** (attempt - 1));
      try {
        const res = await fetch(`${this.config.host}/v1/chat/completions`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
          signal: this.config.timeoutMs ? AbortSignal.timeout(this.config.timeoutMs) : undefined,
        });
        if (!res.ok) {
          const detail = (await res.text()).slice(0, 500);
          this.transcribe({ kind: 'http-error', label: label ?? null, status: res.status, detail });
          lastError = new LlmError(`LLM server returned ${res.status}: ${detail}`);
          continue;
        }
        const data = await res.json();
        const message = data?.choices?.[0]?.message;
        const content = message?.content;
        this.lastFinishReason = data?.choices?.[0]?.finish_reason ?? null;
        this.lastUsage = data?.usage ?? null;
        // Reasoning-capable models served by llama.cpp (with --reasoning on)
        // deliver the chain of thought separately from the content.
        this.lastReasoning =
          typeof message?.reasoning_content === 'string' ? message.reasoning_content : null;
        if (typeof content !== 'string' || content.trim() === '') {
          this.transcribe({
            kind: 'empty-response',
            label: label ?? null,
            finishReason: this.lastFinishReason,
            usage: this.lastUsage,
          });
          lastError = new LlmError(
            'LLM returned an empty response (the conversation may have exceeded the model context window)',
            { kind: 'parse' },
          );
          continue;
        }
        // The transcript keeps only what is new: the model's response (and
        // its reasoning). Prompts and chat history are deliberately not
        // logged; tool entries record the round-trip deltas.
        this.transcribe({
          kind: 'chat',
          label: label ?? null,
          finishReason: this.lastFinishReason,
          usage: this.lastUsage,
          reasoning: this.lastReasoning,
          response: content,
        });
        return content;
      } catch (err) {
        if (err instanceof LlmError) {
          lastError = err;
          continue;
        }
        const cause = err.cause ?? err;
        lastError = new LlmError(`could not reach the LLM server (${cause?.code ?? cause?.message ?? err.message})`, {
          kind: 'network',
          cause: err,
        });
      }
    }
    throw lastError;
  }

  // Chat call that must return a JSON object; tolerates code fences and
  // surrounding prose, which local models often emit. When `tools` is given,
  // the model may perform tool round-trips first: a reply of the shape
  // {"tool": "<name>", "args": {...}} executes the tool and sends
  // {"tool_result": ...} back, until the model returns the final JSON.
  // When the tool round limit is reached, the final answer is forced instead
  // of failing the task (the tool work already done is kept).
  async chatJson(messages, opts = {}) {
    const tools = opts.tools ?? null;
    const maxToolRounds = this.config.maxToolRounds ?? 100;
    const convo = [...messages];
    let rounds = 0;
    for (;;) {
      const raw = await this.chat(convo, opts);
      const parsed = this.parseJsonOrThrow(raw, opts.label);
      const isToolRequest =
        tools !== null &&
        parsed !== null &&
        typeof parsed === 'object' &&
        !Array.isArray(parsed) &&
        typeof parsed.tool === 'string' &&
        tools.has(parsed.tool);
      if (!isToolRequest) return parsed;
      if (rounds >= maxToolRounds) {
        this.logger(
          `tool round limit (${maxToolRounds}) reached; forcing the final answer`,
        );
        this.transcribe({ kind: 'wrap-up', label: opts.label ?? null, rounds });
        convo.push(this.assistantTurn(raw));
        convo.push({
          role: 'user',
          content:
            'Tool round limit reached. Do not use any more tools; reply with the final JSON answer now.',
        });
        return this.parseJsonOrThrow(await this.chat(convo, opts), opts.label);
      }
      const result = await tools.exec(parsed.tool, parsed.args);
      let value = JSON.stringify(result);
      if (value.length > MAX_TOOL_RESULT_CHARS) {
        value = JSON.stringify(
          `${value.slice(0, MAX_TOOL_RESULT_CHARS)}\n... (tool result truncated to fit; narrow your next query)`,
        );
      }
      this.transcribe({
        kind: 'tool',
        label: opts.label ?? null,
        round: rounds + 1,
        tool: parsed.tool,
        args: parsed.args,
        result: value,
      });
      convo.push(this.assistantTurn(raw));
      convo.push({ role: 'user', content: `{"tool_result": ${value}}` });
      rounds += 1;
    }
  }

  // The assistant turn replayed in a tool round-trip keeps the model's own
  // reasoning (reasoning_content) alongside its content, so the next call
  // continues the chain of thought instead of starting it from scratch.
  // Servers that do not preserve it (llama.cpp without --reasoning-preserve)
  // simply ignore the field.
  assistantTurn(raw) {
    return {
      role: 'assistant',
      content: raw,
      ...(this.lastReasoning === null ? {} : { reasoning_content: this.lastReasoning }),
    };
  }

  // Parse a final answer, and when it is not valid JSON say WHY: whether the
  // server cut the response off (finish_reason=length) or the model simply
  // emitted malformed JSON. The full raw response goes to the transcript.
  parseJsonOrThrow(raw, label) {
    try {
      return extractJson(raw);
    } catch (err) {
      if (!(err instanceof LlmError) || err.kind !== 'parse') throw err;
      this.transcribe({
        kind: 'parse-error',
        label: label ?? null,
        finishReason: this.lastFinishReason,
        usage: this.lastUsage,
        reasoning: this.lastReasoning,
        rawLength: raw.length,
        raw,
      });
      const cut = this.lastFinishReason === 'length';
      const why = cut
        ? 'the response was cut off by the token limit, finish_reason=length'
        : `finish_reason=${this.lastFinishReason ?? 'unknown'}`;
      throw new LlmError(
        `LLM did not return valid JSON (${why}, ${raw.length} chars): ${raw.trim().slice(0, 300)}`,
        { kind: 'parse' },
      );
    }
  }
}

export function extractJson(text) {
  const trimmed = String(text ?? '').trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    // fall through to bracket scanning
  }
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidates = [fenced?.[1], trimmed];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const start = candidate.search(/[[{]/);
    const endBrace = Math.max(candidate.lastIndexOf('}'), candidate.lastIndexOf(']'));
    if (start >= 0 && endBrace > start) {
      try {
        return JSON.parse(candidate.slice(start, endBrace + 1));
      } catch {
        // try the next candidate
      }
    }
  }
  throw new LlmError(`LLM did not return valid JSON: ${trimmed.slice(0, 300)}`, {
    kind: 'parse',
  });
}
