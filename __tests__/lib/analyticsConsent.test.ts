import {
  ANALYTICS_CONSENT_KEY,
  getAnalyticsConsent,
  parseAnalyticsConsent,
  setAnalyticsConsent,
} from "lib/analytics/consent";

describe("parseAnalyticsConsent", () => {
  it("returns accepted and declined for valid values", () => {
    expect(parseAnalyticsConsent("accepted")).toBe("accepted");
    expect(parseAnalyticsConsent("declined")).toBe("declined");
  });

  it("returns null for invalid or empty values", () => {
    expect(parseAnalyticsConsent(null)).toBeNull();
    expect(parseAnalyticsConsent("")).toBeNull();
    expect(parseAnalyticsConsent("maybe")).toBeNull();
  });
});

describe("getAnalyticsConsent / setAnalyticsConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when nothing is stored", () => {
    expect(getAnalyticsConsent()).toBeNull();
  });

  it("persists and reads accepted consent", () => {
    setAnalyticsConsent("accepted");
    expect(localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe("accepted");
    expect(getAnalyticsConsent()).toBe("accepted");
  });

  it("persists declined consent", () => {
    setAnalyticsConsent("declined");
    expect(getAnalyticsConsent()).toBe("declined");
  });

  it("dispatches a consent event when set", () => {
    const handler = jest.fn();
    window.addEventListener("mub-analytics-consent", handler);
    setAnalyticsConsent("accepted");
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener("mub-analytics-consent", handler);
  });
});
