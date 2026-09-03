import { fireEvent, render, screen } from "@testing-library/react";
import Anchor from "components/Tags/Anchor";
import { ANALYTICS_CONSENT_KEY } from "lib/analytics/consent";
import { AnalyticsEvents } from "lib/analytics/events";
import { trackEvent } from "lib/analytics/track";

jest.mock("lib/analytics/track", () => ({
  trackEvent: jest.fn(),
}));

const mockedTrackEvent = trackEvent as jest.MockedFunction<typeof trackEvent>;

describe("Anchor", () => {
  beforeEach(() => {
    localStorage.clear();
    mockedTrackEvent.mockClear();
  });

  it("renders the href and tracks on click", () => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "accepted");
    render(
      <Anchor
        href="/privacy-policy/"
        event={AnalyticsEvents.PRIVACY_POLICY_CLICKED}
        properties={{ source: "footer", url: "/privacy-policy/" }}
      >
        Privacy Policy
      </Anchor>
    );

    const link = screen.getByRole("link", { name: "Privacy Policy" });
    expect(link).toHaveAttribute("href", "/privacy-policy/");

    fireEvent.click(link);

    expect(mockedTrackEvent).toHaveBeenCalledWith(
      AnalyticsEvents.PRIVACY_POLICY_CLICKED,
      { source: "footer", url: "/privacy-policy/" }
    );
  });
});
