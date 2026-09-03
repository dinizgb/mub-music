export const ANALYTICS_CONSENT_KEY = "mub-analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "mub-analytics-consent";

export type AnalyticsConsent = "accepted" | "declined";

/**
 * Parses a stored consent value.
 * @param {string | null} value Raw localStorage value.
 * @return {AnalyticsConsent | null} Valid consent or null.
 */
export function parseAnalyticsConsent(
  value: string | null
): AnalyticsConsent | null {
  if (value === "accepted" || value === "declined") {
    return value;
  }
  return null;
}

/**
 * Reads analytics consent from localStorage.
 * @return {AnalyticsConsent | null} Stored consent or null if unset/invalid.
 */
export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") {
    return null;
  }
  return parseAnalyticsConsent(localStorage.getItem(ANALYTICS_CONSENT_KEY));
}

/**
 * Persists analytics consent and notifies listeners.
 * @param {AnalyticsConsent} value Consent choice.
 */
export function setAnalyticsConsent(value: AnalyticsConsent): void {
  localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
}
