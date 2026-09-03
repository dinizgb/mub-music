import { sendGAEvent } from "@next/third-parties/google";

/**
 * Sends a custom GA4 event with the shared analytics payload.
 * @param {string} name Event name.
 * @param {Record<string, string | number | undefined>} properties Event props.
 */
export function sendGoogleAnalyticsEvent(
  name: string,
  properties: Record<string, string | number | undefined>
): void {
  sendGAEvent("event", name, properties);
}
