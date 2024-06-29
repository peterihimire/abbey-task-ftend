import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userAPI from "../../api/user";

const userDataString = localStorage.getItem("abbeytask_user");
const userData: UserData | null = userDataString
  ? JSON.parse(userDataString)
  : null;

export const getUserInfo = createAsyncThunk(
  "user/user_info",
  async (_, thunkApi) => {
    try {
      const response = await userAPI.getUserInfo();
      const data = response.data;

      console.log("THis is response.data..", data);

      const abbeyData = JSON.parse(
        localStorage.getItem("abbeytask_user") || "{}"
      );
      console.log("This is abbeyData", abbeyData);

      const { followers, following, fullname, friends, friendOf, acctId } =
        response.data.data;

      const newAbbeyData = {
        ...abbeyData,
        ...{ followers, following, fullname, friendOf, friends, acctId },
      };
      console.log(newAbbeyData);

      localStorage.setItem("abbeytask_user", JSON.stringify(newAbbeyData));

      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

interface Following {
  fullname: string;
  email: string;
  id: number;
}

interface Follower {
  followerId: number;
  following: Following;
}

interface FriendDetails {
  fullname: string;
  email: string;
  id: number;
}

interface Friend {
  status: string;
  friend: FriendDetails;
}

interface UserData {
  fullname: string;
  acct_id: string;
  email: string;
  followers: Follower[];
  friends: Friend[];
  friendOf: string[];
  following: string[];
}

interface UserState {
  loading: boolean;
  error: string | null;
  dashboard: any | null;
  authenticated: boolean;
  userData: UserData | null;
}

const initialState = {
  loading: false,
  error: null,
  dashboard: null,
  authenticated: !!userData,
  userData: userData,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getUserInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data;
        state.authenticated = true;
      })
      .addCase(getUserInfo.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
