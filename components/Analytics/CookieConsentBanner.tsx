"use client";

import { useEffect, useState } from "react";
import { Button } from "components/ui/button";
import {
  ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from "lib/analytics/consent";
import { i18n } from "@/i18n";
import { AnalyticsEvents } from "lib/analytics/events";
import { trackEvent } from "lib/analytics/track";
import Anchor from "components/Tags/Anchor";

/**
 * Bottom cookie consent bar. Shown until the visitor accepts or declines.
 * @return {JSX.Element | null} Consent UI or null after a choice.
 */
export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<AnalyticsConsent | null | undefined>(
    undefined
  );

  useEffect(() => {
    setConsent(getAnalyticsConsent());

    const sync = () => setConsent(getAnalyticsConsent());
    window.addEventListener(ANALYTICS_CONSENT_EVENT, sync);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, sync);
  }, []);

  if (consent === undefined || consent !== null) {
    return null;
  }

  const onChoose = (value: AnalyticsConsent) => {
    setAnalyticsConsent(value);
    setConsent(value);
    window.setTimeout(() => {
      trackEvent(AnalyticsEvents.COOKIE_CONSENT_CLICKED, { choice: value });
    }, 0);
  };

  return (
    <div
      className="border-line-bottom bg-secondary fixed inset-x-0 bottom-0 z-100
        border-t px-4 py-4 shadow-lg"
      role="dialog"
      aria-label={i18n.consent.ariaLabel}
    >
      <div
        className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-text-4 text-sm leading-6">
          {i18n.consent.message}{" "}
          <Anchor
            href="/privacy-policy/"
            className="text-primary hover:text-primary-hover underline
              underline-offset-2"
            event={AnalyticsEvents.PRIVACY_POLICY_CLICKED}
            properties={{ source: "banner", url: "/privacy-policy/" }}
          >
            {i18n.consent.privacyLink}
          </Anchor>
          .
        </p>
        <div className="flex shrink-0 flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChoose("declined")}
          >
            {i18n.consent.decline}
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => onChoose("accepted")}
          >
            {i18n.consent.accept}
          </Button>
        </div>
      </div>
    </div>
  );
}
