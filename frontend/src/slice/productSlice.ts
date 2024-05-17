import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { productService } from "../service/productService";
import { ProductProps } from "../interfaces/ProductProps";

interface IinitialState {
  success: boolean;
  loading: boolean;
  product: ProductProps;
  products: ProductProps[];
}

const initialState: IinitialState = {
  success: false,
  loading: false,
  product: {
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
  },
  products: [],
};

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const res = await productService.getProducts();

  return res;
});

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data: FormData) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE3MTU3NzU0MTl9.LG-BY2EzmTvtqPrA49isGcT-Pma2mX28K2K3x73SJww";

    const res = await productService.createProduct(data, token);

    return res;
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<ProductProps[]>) => {
          state.success = true;
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(getProducts.rejected, (state) => {
        state.success = false;
        state.loading = false;
        state.products = [];
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.success = false;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
