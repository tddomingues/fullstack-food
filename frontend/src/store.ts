import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
