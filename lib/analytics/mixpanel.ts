import mixpanel from "mixpanel-browser";

export const MIXPANEL_INIT_OPTIONS = {
  autocapture: true,
  record_sessions_percent: 100,
} as const;

/**
 * Initializes Mixpanel once a project token is available.
 * @param {string} token Mixpanel project token.
 */
export function initMixpanel(token: string): void {
  mixpanel.init(token, { ...MIXPANEL_INIT_OPTIONS });
}

/**
 * Sends a Mixpanel event with the shared analytics payload.
 * @param {string} name Event name.
 * @param {Record<string, string | number | undefined>} properties Event props.
 */
export function trackMixpanelEvent(
  name: string,
  properties: Record<string, string | number | undefined>
): void {
  try {
    mixpanel.track(name, properties);
  } catch {
    return;
  }
}
