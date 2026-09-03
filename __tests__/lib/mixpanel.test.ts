import mixpanel from "mixpanel-browser";
import {
  initMixpanel,
  MIXPANEL_INIT_OPTIONS,
  trackMixpanelEvent,
} from "lib/analytics/mixpanel";

jest.mock("mixpanel-browser", () => ({
  __esModule: true,
  default: {
    init: jest.fn(),
    track: jest.fn(),
  },
}));

describe("initMixpanel", () => {
  it("initializes mixpanel with autocapture and session replay", () => {
    initMixpanel("token-123");

    expect(mixpanel.init).toHaveBeenCalledWith("token-123", {
      ...MIXPANEL_INIT_OPTIONS,
    });
  });
});

describe("trackMixpanelEvent", () => {
  beforeEach(() => {
    (mixpanel.track as jest.Mock).mockReset();
  });

  it("forwards the event name and properties to mixpanel.track", () => {
    trackMixpanelEvent("product_card_clicked", { title: "Strat" });

    expect(mixpanel.track).toHaveBeenCalledWith("product_card_clicked", {
      title: "Strat",
    });
  });

  it("swallows track errors", () => {
    (mixpanel.track as jest.Mock).mockImplementation(() => {
      throw new Error("boom");
    });

    expect(() =>
      trackMixpanelEvent("product_card_clicked", { title: "Strat" })
    ).not.toThrow();
  });
});
