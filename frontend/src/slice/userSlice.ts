import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserProps } from "../interfaces/UserProps";
import { userService } from "../service/userService";
import Cookies from "js-cookie";

interface IInitialState {
  user: UserProps | null;
  token: string | undefined;
  error: string | null;
  loading: boolean;
}

const token = Cookies.get("token");

const initialState: IInitialState = {
  user: null,
  token: token === undefined ? undefined : token,
  error: null,
  loading: false,
};

export const login = createAsyncThunk(
  "login",
  async (user: { email: string; password: string }) => {
    const data: { message: string; token: string } =
      await userService.login(user);

    //Cookies.set("token", document.cookie.split("token=")[1]);

    return data;
  },
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  const data = await userService.logout();

  Cookies.remove("token");

  // if (data.error) {
  //   return { error: thunkAPI.rejectWithValue };
  // }

  return data;
});

export const getUser = createAsyncThunk("getUser", async (token: string) => {
  console.log(token);
  const data = await userService.getUser(token);
  console.log("ss");
  return data;
});

const userSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = Cookies.get("token");
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.token = undefined;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.token = undefined;
        state.user = null;
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
