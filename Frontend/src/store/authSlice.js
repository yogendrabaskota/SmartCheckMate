import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/statuses";
import { API, APIAuthenticated } from "../globals/http";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    status: STATUSES.LOADING,
    token: "",
    forgotPasswordData: {
      email: "",
      status: STATUSES.LOADING,
    },
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setEmail(state, action) {
      state.forgotPasswordData.email = action.payload;
    },
    setForgotPasswordDataStatus(state, action) {
      state.forgotPasswordData.status = action.payload;
    },
  },
});

export const {
  setUser,
  setStatus,
  setToken,
  setEmail,
  setForgotPasswordDataStatus,
} = authSlice.actions;
export default authSlice.reducer;

export function registerUser(data) {
  return async function registerUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/register", data);
      if (response.status == 200) {
        console.log("User registered successfully");

        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(error.message);
    }
  };
}

export function loginUser(data) {
  return async function loginUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/login", data);
      if (response.status == 200) {
        console.log("User logged in successfully");
        dispatch(setUser(response.data.user));
        dispatch(setToken(response.data.token));
        dispatch(setStatus(STATUSES.SUCCESS));
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(error.message);
    }
  };
}

export function forgetPassword(data) {
  return async function forgetPasswordThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(setForgotPasswordDataStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post("/forget", data);
      if (response.status == 200) {
        console.log("Password reset link sent successfully");
        dispatch(setEmail(response.data.data));
        console.log("yaha", response.data.data);
        // dispatch(setForgotPasswordStatus(STATUSES.SUCCESS));
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      dispatch(setForgotPasswordDataStatus(STATUSES.ERROR));
      dispatch(setStatus(STATUSES.ERROR));
      console.log(error.message);
    }
  };
}

export function verifyOTP(data) {
  return async function verifyOTPThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(setForgotPasswordDataStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/verifyOtp", data);
      if (response.status == 200) {
        console.log("OTP verified successfully");
        dispatch(setEmail(data.email));
        // dispatch(setStatus(STATUSES.SUCCESS));
        dispatch(setForgotPasswordDataStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setForgotPasswordDataStatus(STATUSES.ERROR));
      console.log(error.message);
    }
  };
}

export function resetPassword(data) {
  return async function resetPasswordThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/resetPassword", data);
      if (response.status === 200) {
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(error.messssage);
    }
  };
}
