import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CookieConsentBanner from "components/Analytics/CookieConsentBanner";
import { ANALYTICS_CONSENT_KEY } from "lib/analytics/consent";
import { AnalyticsEvents } from "lib/analytics/events";
import { i18n } from "@/i18n";
import { trackEvent } from "lib/analytics/track";

jest.mock("lib/analytics/track", () => ({
  trackEvent: jest.fn(),
}));

describe("CookieConsentBanner", () => {
  beforeEach(() => {
    localStorage.clear();
    (trackEvent as jest.Mock).mockClear();
  });

  it("shows the banner when consent is unset", async () => {
    render(<CookieConsentBanner />);

    expect(
      await screen.findByRole("dialog", { name: i18n.consent.ariaLabel })
    ).toBeInTheDocument();
    expect(screen.getByText(i18n.consent.accept)).toBeInTheDocument();
    expect(screen.getByText(i18n.consent.decline)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: i18n.consent.privacyLink })
    ).toHaveAttribute("href", "/privacy-policy/");
  });

  it("hides the banner after accept and stores consent", async () => {
    render(<CookieConsentBanner />);

    fireEvent.click(await screen.findByText(i18n.consent.accept));

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: i18n.consent.ariaLabel })
      ).not.toBeInTheDocument();
    });
    expect(localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe("accepted");
    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledWith(
        AnalyticsEvents.COOKIE_CONSENT_CLICKED,
        { choice: "accepted" }
      );
    });
  });

  it("hides the banner after decline", async () => {
    render(<CookieConsentBanner />);

    fireEvent.click(await screen.findByText(i18n.consent.decline));

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: i18n.consent.ariaLabel })
      ).not.toBeInTheDocument();
    });
    expect(localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe("declined");
  });

  it("does not show the banner when consent already exists", async () => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "accepted");
    render(<CookieConsentBanner />);

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: i18n.consent.ariaLabel })
      ).not.toBeInTheDocument();
    });
  });
});
