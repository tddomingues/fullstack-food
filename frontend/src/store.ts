import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
