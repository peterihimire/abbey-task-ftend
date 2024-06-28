import { configureStore } from "@reduxjs/toolkit";

// import postSlice from "./posts/postSlice";
import userSlice from "./features/users/userSlice";

const store = configureStore({
  reducer: userSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
