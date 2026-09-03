import { getAnalyticsConsent } from "lib/analytics/consent";
import {
  AnalyticsEvents,
  type AnalyticsEventMap,
  type AnalyticsEventName,
} from "lib/analytics/events";
import { sendGoogleAnalyticsEvent } from "lib/analytics/google";
import { trackMixpanelEvent } from "lib/analytics/mixpanel";

export { AnalyticsEvents };

/**
 * Tracks an analytics event on GA and Mixpanel after consent.
 * @param {string} name Shared snake_case event name.
 * @param {object} properties Shared event properties.
 */
export function trackEvent<E extends AnalyticsEventName>(
  name: E,
  properties: AnalyticsEventMap[E]
): void {
  if (getAnalyticsConsent() !== "accepted") {
    return;
  }

  sendGoogleAnalyticsEvent(name, properties);
  trackMixpanelEvent(name, properties);
}
