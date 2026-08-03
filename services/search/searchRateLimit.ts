const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 10_000;

const requestLog = new Map<string, number[]>();

/**
 * Resets in-memory rate-limit state (tests only).
 * @return {void}
 */
export function resetSearchRateLimit() {
  requestLog.clear();
}

/**
 * Returns whether a client key is still within the search rate limit.
 * @param {string} clientKey Client identifier (usually IP).
 * @return {boolean} True if the request is allowed.
 */
export function isSearchRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const previous = requestLog.get(clientKey) ?? [];
  const recent = previous.filter((timestamp) => timestamp > windowStart);

  if (recent.length >= RATE_LIMIT_MAX) {
    requestLog.set(clientKey, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(clientKey, recent);
  return false;
}
