// Small helpers shared by the agent.

export function makeRng(random = Math.random) {
  return {
    pick(items) {
      return items[Math.floor(random() * items.length)];
    },
  };
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function nowIso() {
  return new Date().toISOString();
}
