import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchInput from "components/Inputs/SearchInput";
import mobileMenuReducer from "redux/slices/mobileMenu/";
import searchAutoFillReducer from "redux/slices/searchAutoFill";

const fetchSearchProductsMock = jest.fn();

jest.mock("@/lib/api/searchProducts", () => ({
  fetchSearchProducts: (...args: unknown[]) => fetchSearchProductsMock(...args),
}));

/**
 * Builds a Redux store for SearchInput tests.
 * @return {object} Test store.
 */
function createTestStore() {
  return configureStore({
    reducer: {
      mobileMenuEvents: mobileMenuReducer,
      searchAutoFillEvents: searchAutoFillReducer,
    },
  });
}

describe("SearchInput", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    fetchSearchProductsMock.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("debounces rapid keystrokes and fetches only the final query", async () => {
    fetchSearchProductsMock.mockResolvedValue([
      {
        title: "Strat",
        slug: "strat",
        product_info: {
          thumbnail: { sourceUrl: "https://example.com/s.jpg" },
          category: { slug: "guitars" },
          subcategory: { slug: "electric" },
        },
      },
    ]);

    const store = createTestStore();
    render(
      <Provider store={store}>
        <SearchInput placeholder="Search" />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Fe" } });
    fireEvent.change(input, { target: { value: "Fen" } });
    fireEvent.change(input, { target: { value: "Fender" } });

    await act(async () => {
      jest.advanceTimersByTime(449);
    });
    expect(fetchSearchProductsMock).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    await waitFor(() => {
      expect(fetchSearchProductsMock).toHaveBeenCalledTimes(1);
      expect(fetchSearchProductsMock).toHaveBeenCalledWith(
        "Fender",
        expect.any(AbortSignal)
      );
    });

    await waitFor(() => {
      expect(store.getState().searchAutoFillEvents.showSearchAutoFill).toBe(
        true
      );
      expect(
        store.getState().searchAutoFillEvents.showSearchAutoFillResults
      ).toHaveLength(1);
    });
  });

  it("does not fetch when the query is shorter than two characters", async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <SearchInput placeholder="Search" />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "F" },
    });

    await act(async () => {
      jest.advanceTimersByTime(450);
    });

    expect(fetchSearchProductsMock).not.toHaveBeenCalled();
    expect(store.getState().searchAutoFillEvents.showSearchAutoFill).toBe(
      false
    );
  });

  it("does not refetch the same query after debounce", async () => {
    fetchSearchProductsMock.mockResolvedValue([]);

    const store = createTestStore();
    render(
      <Provider store={store}>
        <SearchInput placeholder="Search" />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Fender" } });

    await act(async () => {
      jest.advanceTimersByTime(450);
    });

    await waitFor(() => {
      expect(fetchSearchProductsMock).toHaveBeenCalledTimes(1);
    });

    fireEvent.change(input, { target: { value: "Fender" } });

    await act(async () => {
      jest.advanceTimersByTime(450);
    });

    expect(fetchSearchProductsMock).toHaveBeenCalledTimes(1);
  });
});
