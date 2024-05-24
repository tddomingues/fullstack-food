import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addressService } from "../service/addressService";
import { AddressProps } from "../interfaces/AddressProps";

interface InitialStateProps {
  address: AddressProps | null;
  error: string[] | null;
  loading: boolean;
  success: string | null;
}

const initialState: InitialStateProps = {
  address: null,
  error: null,
  loading: false,
  success: null,
};

export const getAddress = createAsyncThunk(
  "address/getAddress",
  async (token: string, thunkAPI) => {
    const data = await addressService.getAddress(token);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (
    { address, token }: { address: AddressProps; token: string },
    thunkAPI,
  ) => {
    const data = await addressService.updateAddress(address, token);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (
    { address, token }: { address: AddressProps; token: string },
    thunkAPI,
  ) => {
    const data = await addressService.createAddress(address, token);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.address = action.payload;
        state.loading = false;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.address = null;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateAddress.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Atualizado com sucesso.";
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createAddress.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Atualizado com sucesso.";
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // .addCase(createAddress.fulfilled, (state, action) => {
    //   state.address = action.payload;
    // })
  },
});

//export const {} = addressSlice.actions;

export default addressSlice.reducer;
