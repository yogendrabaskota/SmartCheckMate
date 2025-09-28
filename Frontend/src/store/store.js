import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import schoolSlice from "./schoolSlice";
import classSlice from "./classSlice";
import attendanceSlice from "./attendanceSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    school: schoolSlice,
    class: classSlice,
    attendance: attendanceSlice,
  },
});

export default store;
