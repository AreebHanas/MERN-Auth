import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User/UserSlice";

export const Store = configureStore({
  reducer: {
    user: UserReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});
