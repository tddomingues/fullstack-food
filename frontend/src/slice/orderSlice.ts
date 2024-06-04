import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { orderService } from "../service/orderService";
import { OrderProps } from "../interfaces/OrderProps";

export interface InitialStateProps {
  error: string[] | null;
  loading: boolean;
  orders: OrderProps[];
}

const initialState: InitialStateProps = {
  error: null,
  loading: false,
  orders: [],
};

export const getOrdersByUser = createAsyncThunk(
  "stripe/getOrdersByUser",
  async (userId: string, thunkAPI) => {
    const data = await orderService.getOrdersByUser(userId);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

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
      });
  },
});

//export const {} = addressSlice.actions;

export default orderSlice.reducer;
