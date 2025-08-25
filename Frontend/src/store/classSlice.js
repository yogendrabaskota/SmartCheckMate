import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/statuses";
import { APIAuthenticated } from "../globals/http";

const classSlice = createSlice({
  name: "class",
  initialState: {
    classes: [],
    status: STATUSES.LOADING,
  },
  reducers: {
    setClass(state, action) {
      state.classes = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    removeClass(state, action) {
      state.classes = state.classes.filter(
        (item) => item._id !== action.payload
      );
    },
    addClass(state, action) {
      state.classes.push(action.payload);
    },
  },
});

export const { setClass, setStatus, removeClass, addClass } =
  classSlice.actions;
export default classSlice.reducer;

export function fetchClass(id) {
  return async function fetchClassThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get(`/class/add/${id}`);
      if (response.status === 200) {
        dispatch(setClass(response.data.data));
        console.log("class fetched", response.data.data);
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(error.message);
    }
  };
}

export function deleteClass(schoolId, classId) {
  return async function deleteClassThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.delete(
        `/class/${schoolId}/${classId}`
      );
      if (response.status === 200) {
        dispatch(setStatus(STATUSES.SUCCESS));
        dispatch(removeClass(classId));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function createClass(schoolId, name) {
  return async function addClassThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post(`/class/add/${schoolId}`, {
        name,
      });
      if (response.status === 200) {
        dispatch(addClass(response.data.data));
        dispatch(setStatus(STATUSES.SUCCESS));
        return response.data;
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
