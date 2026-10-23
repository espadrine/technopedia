// Web search for the fact-check action ("Fact-check the content using the
// Web"). Best effort and dependency-free:
//
// - By default it scrapes the DuckDuckGo HTML endpoint.
// - TECHNOPEDIA_WEB_SEARCH_URL overrides it with any endpoint returning JSON,
//   either {"results": [{"title", "url", "snippet"}]} or a bare array of such
//   objects. Use "{q}" as the query placeholder, e.g.
//   http://127.0.0.1:9999/search?q={q}
// - 'off' (set in the agent config) disables web search entirely; the
//   fact-check falls back to model knowledge.

const DEFAULT_PROVIDER = 'https://html.duckduckgo.com/html/?q={q}';
const RESULTS_LIMIT = 5;

function buildUrl(providerUrl, query) {
  const template = providerUrl ?? DEFAULT_PROVIDER;
  const encoded = encodeURIComponent(query);
  return template.includes('{q}') ? template.replace('{q}', encoded) : `${template}${encoded}`;
}

// DuckDuckGo wraps result URLs in a redirect: extract the real target.
function realUrl(href) {
  const wrapped = href.match(/[?&]uddg=([^&]+)/);
  if (wrapped) return decodeURIComponent(wrapped[1]);
  if (href.startsWith('//')) return `https:${href}`;
  return href;
}

function stripTags(html) {
  return String(html)
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function parseDuckDuckGo(html) {
  const results = [];
  const re = /<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let match;
  while ((match = re.exec(html)) && results.length < RESULTS_LIMIT) {
    results.push({ title: stripTags(match[2]), url: realUrl(match[1]), snippet: '' });
  }
  const snippetRe = /<a[^>]*class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
  let i = 0;
  while ((match = snippetRe.exec(html)) && i < results.length) {
    results[i].snippet = stripTags(match[1]);
    i++;
  }
  return results.filter((r) => r.url.startsWith('http'));
}

function parseJsonResults(body) {
  const data = JSON.parse(body);
  const list = Array.isArray(data) ? data : data?.results;
  if (!Array.isArray(list)) throw new Error('web search JSON has no results array');
  return list
    .map((r) => ({
      title: String(r?.title ?? ''),
      url: String(r?.url ?? r?.href ?? ''),
      snippet: String(r?.snippet ?? r?.description ?? ''),
    }))
    .filter((r) => r.url.startsWith('http'))
    .slice(0, RESULTS_LIMIT);
}

export async function searchWeb(query, { webSearchUrl = null, webTimeoutMs = 10000 } = {}) {
  const url = buildUrl(webSearchUrl, query);
  const res = await fetch(url, {
    signal: AbortSignal.timeout(webTimeoutMs),
    headers: { 'user-agent': 'technopedia-agent/1.0' },
  });
  if (!res.ok) throw new Error(`web search returned ${res.status}`);
  const body = await res.text();
  if (webSearchUrl) {
    try {
      return parseJsonResults(body);
    } catch {
      // fall through to HTML scraping
    }
  }
  return parseDuckDuckGo(body);
}

const FETCH_LIMIT = 100000;

function htmlToText(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<\/(p|div|h[1-6]|li|tr|table|section|article)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();
}

// Fetch a URL and return its content as text (HTML is stripped to text).
// Used by the web_fetch tool of the agent.
export async function fetchWebPage(url, { webTimeoutMs = 10000 } = {}) {
  const parsed = new URL(url);
  if (!/^https?:$/.test(parsed.protocol)) {
    throw new Error('only http(s) URLs are supported');
  }
  const res = await fetch(url, {
    signal: AbortSignal.timeout(webTimeoutMs),
    headers: { 'user-agent': 'technopedia-agent/1.0' },
  });
  if (!res.ok) throw new Error(`web fetch returned ${res.status}`);
  const body = (await res.text()).slice(0, FETCH_LIMIT);
  const contentType = res.headers.get('content-type') ?? '';
  const text = /html/i.test(contentType) ? htmlToText(body) : body;
  return { url, text, truncated: body.length >= FETCH_LIMIT };
}
