import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userAPI from "../../api/user";

import {
  UserPayloadProps,
  UserResponseProps,UserRegPayloadProps
  // VerifyPayloadProps,
} from "../../../types/types";
interface UserData {
  // Define the structure of your user data here
  acct_id: string;
  email: string;
}
const userDataString = localStorage.getItem("abbeytask_user");
const userData: UserData | null = userDataString
  ? JSON.parse(userDataString)
  : null;

// import Post from "../../models/postModel";

export const registerUser = createAsyncThunk(
  "/register",
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
  "/login",
  async (payload: UserPayloadProps, thunkApi) => {
    console.log("My login payload: ", payload);
    try {
      const response = await userAPI.loginUser(payload);
      const data = response.data;
      localStorage.setItem("abbeytask_user", JSON.stringify(data.data));
      return data;
    } catch (error: any) {
      console.log("Error yeah: ", error.response);
      const message = error?.response?.data?.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "/user_info",
  async (payload: string, thunkApi) => {
    try {
      const response = await userAPI.getUserInfo();
      const data = response.data;
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/logout",
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

// export const getPosts = createAsyncThunk(
//   "posts/getPosts",
//   async (data, thunkApi) => {
//     try {
//       const response = await axios.get<UserResponseProps>(
//         "https://jsonplaceholder.typicode.com/posts?_limit=10"
//       );
//       return response.data;
//     } catch (error: any) {
//       const message = error.message;
//       return thunkApi.rejectWithValue(message);
//     }
//   }
// );

interface UserState {
  loading: boolean;
  error: string | null;
  data: UserResponseProps | null;
  dashboard: any | null;
  authenticated: boolean;
  userData: UserData;
}

const initialState = {
  loading: false,
  error: null,
  data: null,
  dashboard: null,
  authenticated: !!userData,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
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
        state.data = action.payload;
        state.authenticated = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        // state.authenticated = true;
      })
      .addCase(getUserInfo.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
