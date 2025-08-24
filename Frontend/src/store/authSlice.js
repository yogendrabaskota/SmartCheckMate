import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/statuses";
import { API } from "../globals/http";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    status: STATUSES.LOADING,
    token: "",
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
  },
});

export const { setUser, setStatus, setToken } = authSlice.actions;
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
