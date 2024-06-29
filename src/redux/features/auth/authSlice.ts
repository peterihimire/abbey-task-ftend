import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userAPI from "../../api/user";
import { getUserInfo } from "../users/userSlice";

import { UserPayloadProps, UserRegPayloadProps } from "../../../types/types";
interface UserData {
  fullname: string;
  acct_id: string;
  email: string;
  followers: string[];
  following: string[];
  friends: string[];
  friendOf: string[];
}
const userDataString = localStorage.getItem("abbeytask_user");
const userData: UserData | null = userDataString
  ? JSON.parse(userDataString)
  : null;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: UserRegPayloadProps, thunkApi) => {
    console.log("my reg payload: ", payload);
    try {
      const response = await userAPI.registerUser(payload);
      const data = response.data;
      return data;
    } catch (error: any) {
      console.log("This is error message,lets see...", error);
      const message = error.response.data;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: UserPayloadProps, thunkApi) => {
    console.log("My login payload: ", payload);
    try {
      const response = await userAPI.loginUser(payload);
      const data = response.data;
      localStorage.setItem("abbeytask_user", JSON.stringify(data.data));
      await thunkApi.dispatch(getUserInfo());
      return data;
    } catch (error: any) {
      console.log("Error yeah: ", error.response);
      const message = error?.response?.data?.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (payload, thunkApi) => {
    try {
      const response = await userAPI.logoutUser();
      const data = response.data;
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    } finally {
      localStorage.removeItem("abbeytask_user");
    }
  }
);

interface AuthState {
  loading: boolean;
  error: string | null;
  authenticated: boolean;
  userData: UserData;
}

const initialState = {
  loading: false,
  error: null,
  authenticated: !!userData,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
