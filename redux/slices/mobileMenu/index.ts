import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = { showMobileMenu: boolean };

const initialState: SliceState = {
  showMobileMenu: false,
};

export const mobileMenuSlice = createSlice({
  name: "menuMobileEvents",
  initialState,
  reducers: {
    toggleMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.showMobileMenu = action.payload;
    },
  },
});

export const { toggleMobileMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
