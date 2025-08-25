import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import schoolSlice from "./schoolSlice";
import classSlice from "./classSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    school: schoolSlice,
    class: classSlice,
  },
});

export default store;
