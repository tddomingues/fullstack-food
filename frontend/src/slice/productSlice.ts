import Cookies from "js-cookie";

//redux
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

//service
import { productService } from "../service/productService";

//interfaces
import { ProductProps } from "../interfaces/ProductProps";

export interface IinitialState {
  success: string | null;
  loading: boolean;
  error: string[] | null;
  product: ProductProps | null;
  products: ProductProps[];
}

const initialState: IinitialState = {
  success: null,
  loading: false,
  error: null,
  product: null,
  products: [],
};

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    const data = await productService.getAllProducts();

    if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    const data = await productService.getProduct(id, token);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (
    { formData, token }: { formData: FormData; token: string },
    thunkAPI,
  ) => {
    const data = await productService.createProduct(formData, token);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (
    {
      formData,
      token,
      id,
    }: {
      formData: FormData;
      token: string;
      id: string;
    },
    thunkAPI,
  ) => {
    const data = await productService.editProduct(formData, token, id);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ _id, token }: { _id: string; token: string }, thunkAPI) => {
    const data = await productService.deleteProduct(_id, token);

    //if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.loading = false;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<ProductProps[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.products = [];
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProduct.fulfilled,
        (state, action: PayloadAction<ProductProps>) => {
          console.log(action);
          state.loading = false;
          state.product = action.payload;
        },
      )
      .addCase(getProduct.rejected, (state) => {
        state.loading = false;
        state.product = null;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.success = "Criado com sucesso.";
        state.loading = false;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.success = null;
        state.loading = false;
        state.error = action.payload as string[];
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.success = "Editado com sucesso,";
        state.loading = false;
        state.error = null;
      })
      .addCase(editProduct.rejected, (state) => {
        state.success = null;
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.success = "Deletado com sucesso.";
        state.loading = false;
        state.products = state.products.filter((product) => {
          return product._id !== action.meta.arg._id;
        });
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        console.log(action);
        state.success = null;
        state.loading = false;
        //state.error = action.payload as string[];
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
