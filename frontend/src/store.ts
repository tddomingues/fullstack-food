import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
