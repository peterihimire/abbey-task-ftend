import { configureStore } from "@reduxjs/toolkit";

// import postSlice from "./posts/postSlice";
import userSlice from "./features/users/userSlice";
import authSlice from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
