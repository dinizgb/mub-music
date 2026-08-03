import mobileMenuReducer, {
  mobileMenuSlice,
  toggleMobileMenu,
} from "redux/slices/mobileMenu/";

describe("mobileMenu slice", () => {
  it("exposes the slice and toggles showMobileMenu from the action payload", () => {
    expect(mobileMenuSlice.name).toBe("menuMobileEvents");

    const opened = mobileMenuReducer(
      { showMobileMenu: false },
      toggleMobileMenu(true)
    );
    expect(opened.showMobileMenu).toBe(true);

    const closed = mobileMenuReducer(opened, toggleMobileMenu(false));
    expect(closed.showMobileMenu).toBe(false);

    const viaSlice = mobileMenuSlice.reducer(
      { showMobileMenu: false },
      toggleMobileMenu(true)
    );
    expect(viaSlice.showMobileMenu).toBe(true);
  });
});
