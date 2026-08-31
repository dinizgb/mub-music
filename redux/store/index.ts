import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import mobileMenuReducer from "redux/slices/mobileMenu/";
import searchAutoFillReducer from "redux/slices/searchAutoFill";

export const store = configureStore({
  reducer: {
    mobileMenuEvents: mobileMenuReducer,
    searchAutoFillEvents: searchAutoFillReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
