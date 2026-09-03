import { render, waitFor } from "@testing-library/react";
import AnalyticsGate from "components/Analytics/AnalyticsGate";
import { ANALYTICS_CONSENT_KEY } from "lib/analytics/consent";
import { initMixpanel } from "lib/analytics/mixpanel";

jest.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid="google-analytics" data-ga-id={gaId} />
  ),
}));

jest.mock("lib/analytics/mixpanel", () => ({
  initMixpanel: jest.fn(),
}));

const mockedInitMixpanel = initMixpanel as jest.MockedFunction<
  typeof initMixpanel
>;

describe("AnalyticsGate", () => {
  const originalGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const originalMixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

  beforeEach(() => {
    localStorage.clear();
    mockedInitMixpanel.mockClear();
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123";
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN = "mp-test-token";
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalGaId;
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN = originalMixpanelToken;
  });

  it("does not render GA or init Mixpanel when consent is missing", async () => {
    const { queryByTestId } = render(<AnalyticsGate />);

    await waitFor(() => {
      expect(queryByTestId("google-analytics")).not.toBeInTheDocument();
    });
    expect(mockedInitMixpanel).not.toHaveBeenCalled();
  });

  it("does not render GA or init Mixpanel when consent is declined", async () => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "declined");
    const { queryByTestId } = render(<AnalyticsGate />);

    await waitFor(() => {
      expect(queryByTestId("google-analytics")).not.toBeInTheDocument();
    });
    expect(mockedInitMixpanel).not.toHaveBeenCalled();
  });

  it("renders GA and inits Mixpanel when consent is accepted", async () => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "accepted");
    const { findByTestId } = render(<AnalyticsGate />);

    const ga = await findByTestId("google-analytics");
    expect(ga).toHaveAttribute("data-ga-id", "G-TEST123");
    await waitFor(() => {
      expect(mockedInitMixpanel).toHaveBeenCalledWith("mp-test-token");
    });
  });

  it("does not render GA when measurement ID is missing", async () => {
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "accepted");
    const { queryByTestId } = render(<AnalyticsGate />);

    await waitFor(() => {
      expect(queryByTestId("google-analytics")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(mockedInitMixpanel).toHaveBeenCalledWith("mp-test-token");
    });
  });

  it("does not init Mixpanel when token is missing", async () => {
    delete process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "accepted");
    const { findByTestId } = render(<AnalyticsGate />);

    await findByTestId("google-analytics");
    expect(mockedInitMixpanel).not.toHaveBeenCalled();
  });
});
