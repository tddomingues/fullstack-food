import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AddressProps } from "../interfaces/AddressProps";
import { CartProps } from "../interfaces/CartProps";
import { orderService } from "../service/orderService";
import { OrderProps } from "../interfaces/OrderProps";

export interface InitialStateProps {
  address: AddressProps | null;
  error: string[] | null;
  loading: boolean;
  success: string | null;
  orders: OrderProps[];
}

const initialState: InitialStateProps = {
  address: null,
  error: null,
  loading: false,
  success: null,
  orders: [],
};

export const getOrdersByUser = createAsyncThunk(
  "stripe/getOrdersByUser",
  async (userId: string, thunkAPI) => {
    const data = await orderService.getOrdersByUser(userId);

    return data;
  },
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersByUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

//export const {} = addressSlice.actions;

export default orderSlice.reducer;
