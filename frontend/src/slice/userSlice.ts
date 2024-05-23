import Cookies from "js-cookie";

//redux
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//interfaces
import { UserProps } from "../interfaces/UserProps";

//servuices
import { userService } from "../service/userService";

interface IInitialState {
  user: UserProps | null;
  token: string | undefined;
  error: string[] | null;
  loading: boolean;
  success: boolean;
}

const token = Cookies.get("token");

const initialState: IInitialState = {
  user: null,
  token: token === undefined ? undefined : token,
  error: null,
  loading: false,
  success: false,
};

interface UserDataForRegisterProps extends UserProps {
  confirmPassword: string;
}

export const login = createAsyncThunk(
  "login",
  async (user: { email: string; password: string }, thunkAPI) => {
    const data = await userService.login(user);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

export const register = createAsyncThunk(
  "register",
  async (user: UserDataForRegisterProps, thunkAPI) => {
    const data = await userService.register(user);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  const data = await userService.logout();

  if (data.error) return thunkAPI.rejectWithValue(data.error);

  Cookies.remove("token");

  return data;
});

export const getUser = createAsyncThunk(
  "getUser",
  async (token: string, thunkAPI) => {
    const data = await userService.getUser(token);

    if (data.error) return thunkAPI.rejectWithValue(data.error);

    return data;
  },
);

const userSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.token = Cookies.get("token");
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.token = undefined;
        state.loading = false;
        state.error = action.payload as string[];
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.token = Cookies.get("token");
        state.loading = true;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.token = undefined;
        state.loading = false;
        state.error = action.payload as string[];
        state.success = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.token = undefined;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.token = undefined;
        state.user = null;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserProps>) => {
        state.loading = false;
        state.user = action.payload;
      });
    // .addCase(
    //   logout.rejected,
    //   (state, action: PayloadAction<{ error: string }>) => {
    //     state.error = action.payload.error;
    //   },
    // );
  },
});

export default userSlice.reducer;
