import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import schoolSlice from "./schoolSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    school: schoolSlice,
  },
});

export default store;
