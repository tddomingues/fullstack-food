import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { productService } from "../service/productService";
import { ProductProps } from "../interfaces/ProductProps";
import Cookies from "js-cookie";

interface IinitialState {
  success: string | null;
  loading: boolean;
  error: string[] | null;
  product: ProductProps | undefined;
  products: ProductProps[];
}

const initialState: IinitialState = {
  success: null,
  loading: false,
  error: null,
  product: undefined,
  products: [],
};

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const res = await productService.getAllProducts();

  return res;
});

export const getProductsByCategory = createAsyncThunk(
  "product/getProductsByCategory",
  async (category: string) => {
    const res = await productService.getProductsByCategory(category);

    return res;
  },
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ id, token }: { id: string; token: string }) => {
    const res = await productService.getProduct(id, token);

    return res;
  },
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (
    { formData, token }: { formData: FormData; token: string },
    thunkAPI,
  ) => {
    const res = await productService.createProduct(formData, token);

    if (res.error) return thunkAPI.rejectWithValue(res.error);

    return res;
  },
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({
    formData,
    token,
    id,
  }: {
    formData: FormData;
    token: string;
    id: string;
  }) => {
    const res = await productService.editProduct(formData, token, id);

    console.log("formData ", formData, token, id);

    return res;
  },
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (_id: string, thunkAPI) => {
    const token = Cookies.get("token") || "";

    const data = await productService.deleteProduct(_id, token);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

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
          state.loading = false;
          state.product = action.payload;
        },
      )
      .addCase(getProduct.rejected, (state) => {
        state.loading = false;
        state.product = undefined;
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
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProductsByCategory.fulfilled,
        (state, action: PayloadAction<ProductProps[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(getProductsByCategory.rejected, (state) => {
        state.loading = false;
        state.products = [];
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.success = "Deletado com sucesso.";
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.success = null;
        state.loading = false;
        state.error = action.payload as string[];
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
