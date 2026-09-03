"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "redux/store";
import CookieConsentBanner from "components/Analytics/CookieConsentBanner";
import AnalyticsGate from "components/Analytics/AnalyticsGate";

/**
 * Client providers for Redux, cookie consent, and gated analytics.
 * @param {{ children: ReactNode }} props Provider children.
 * @return {ReactElement} App providers tree.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <CookieConsentBanner />
      <AnalyticsGate />
    </Provider>
  );
}
