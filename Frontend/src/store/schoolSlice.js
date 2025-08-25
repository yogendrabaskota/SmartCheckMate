import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/statuses";
import { APIAuthenticated } from "../globals/http";

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    schools: [],
    currentSchool: [],
    status: STATUSES.LOADING,
  },
  reducers: {
    setSchools(state, action) {
      state.schools = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setSchool(state, action) {
      state.currentSchool = action.payload;
    },
    removeSchool(state, action) {
      state.schools = state.schools.filter(
        (school) => school._id !== action.payload
      );
    },
    addSchool(state, action) {
      state.schools.push(action.payload);
    },
  },
});

export const { setSchools, setSchool, setStatus, removeSchool, addSchool } =
  schoolSlice.actions;
export default schoolSlice.reducer;

export function fetchSchool() {
  return async function fetchSchoolThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/school");
      if (response.status === 200) {
        dispatch(setSchools(response.data.data));
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(error.message);
    }
  };
}

export function fetchSingleSchool(id) {
  return async function fetchSingleSchoolThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get(`/school/${id}`);
      if (response.status === 200) {
        dispatch(setSchool(response.data.data));
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function deleteSchool(id) {
  return async function deleteSchoolThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.delete(`/school/${id}`);
      if (response.status === 200) {
        dispatch(removeSchool(id));
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function createSchool(schoolData) {
  return async function createSchoolThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post(`/school/add`, schoolData);
      if (response.status === 200) {
        dispatch(addSchool(response.data.data));
        // console.log("add school data", response.data.data);
        dispatch(setStatus(STATUSES.SUCCESS));
        return response.data;
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
