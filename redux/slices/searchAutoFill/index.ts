import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "types/productType";

type SliceState = {
  showSearchAutoFill: boolean;
  showSearchAutoFillResults: ProductType[];
};

const initialState: SliceState = {
  showSearchAutoFill: false,
  showSearchAutoFillResults: [],
};

export const searchAutoFillSlice = createSlice({
  name: "searchAutoFillEvents",
  initialState,
  reducers: {
    toggleSearchAutoFill: (state, action: PayloadAction<boolean>) => {
      state.showSearchAutoFill = action.payload;
    },
    toggleSearchAutoFillResults: (
      state,
      action: PayloadAction<ProductType[]>
    ) => {
      state.showSearchAutoFillResults = action.payload;
    },
  },
});

export const { toggleSearchAutoFill, toggleSearchAutoFillResults } =
  searchAutoFillSlice.actions;

export default searchAutoFillSlice.reducer;
