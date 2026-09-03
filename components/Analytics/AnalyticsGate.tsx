"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
} from "lib/analytics/consent";
import { initMixpanel } from "lib/analytics/mixpanel";

/**
 * Loads consented analytics providers after the visitor accepts.
 * @return {JSX.Element | null} Analytics scripts or null.
 */
export default function AnalyticsGate() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const sync = () => {
      setAccepted(getAnalyticsConsent() === "accepted");
    };
    sync();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, sync);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!accepted || !mixpanelToken) {
      return;
    }
    initMixpanel(mixpanelToken);
  }, [accepted, mixpanelToken]);

  if (!accepted) {
    return null;
  }

  return <>{gaId ? <GoogleAnalytics gaId={gaId} /> : null}</>;
}
