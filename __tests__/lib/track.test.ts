import { sendGAEvent } from "@next/third-parties/google";
import mixpanel from "mixpanel-browser";
import { ANALYTICS_CONSENT_KEY } from "lib/analytics/consent";
import { AnalyticsEvents } from "lib/analytics/events";
import { trackEvent } from "lib/analytics/track";

jest.mock("@next/third-parties/google", () => ({
  sendGAEvent: jest.fn(),
}));

jest.mock("mixpanel-browser", () => ({
  __esModule: true,
  default: {
    init: jest.fn(),
    track: jest.fn(),
  },
}));

const mockedSendGAEvent = sendGAEvent as jest.MockedFunction<
  typeof sendGAEvent
>;

describe("trackEvent", () => {
  beforeEach(() => {
    localStorage.clear();
    mockedSendGAEvent.mockClear();
    (mixpanel.track as jest.Mock).mockClear();
  });

  it("does not send events when consent is missing", () => {
    trackEvent(AnalyticsEvents.PRODUCT_CARD_CLICKED, {
      title: "Strat",
      url: "/products/strat",
      price: 999,
      rating: 4.5,
    });

    expect(mockedSendGAEvent).not.toHaveBeenCalled();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  it("does not send events when consent is declined", () => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "declined");

    trackEvent(AnalyticsEvents.HEADER_NAV_CLICKED, {
      label: "News",
      url: "/news/",
    });

    expect(mockedSendGAEvent).not.toHaveBeenCalled();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  it("sends the same name and properties to GA and Mixpanel after accept", () => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "accepted");
    const properties = {
      title: "Strat",
      url: "/products/strat",
      price: 999,
      rating: 4.5,
    };

    trackEvent(AnalyticsEvents.PRODUCT_CARD_CLICKED, properties);

    expect(mockedSendGAEvent).toHaveBeenCalledWith(
      "event",
      "product_card_clicked",
      properties
    );
    expect(mixpanel.track).toHaveBeenCalledWith(
      "product_card_clicked",
      properties
    );
  });

  it("does not throw when Mixpanel track fails", () => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "accepted");
    (mixpanel.track as jest.Mock).mockImplementation(() => {
      throw new Error("not initialized");
    });

    expect(() =>
      trackEvent(AnalyticsEvents.PRIVACY_POLICY_CLICKED, {
        source: "footer",
        url: "/privacy-policy/",
      })
    ).not.toThrow();
    expect(mockedSendGAEvent).toHaveBeenCalled();
  });
});
