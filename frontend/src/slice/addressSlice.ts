import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addressService } from "../service/addressService";
import { AddressProps } from "../interfaces/AddressProps";

interface InitialStateProps {
  address: AddressProps | null;
}

const initialState: InitialStateProps = {
  address: null,
};

export const getAddress = createAsyncThunk(
  "address/getAddress",
  async (token: string) => {
    const data = await addressService.getAddress(token);

    return data;
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.address = action.payload;
    });
  },
});

//export const {} = addressSlice.actions;

export default addressSlice.reducer;
