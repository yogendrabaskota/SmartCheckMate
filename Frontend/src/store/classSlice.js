import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/statuses";
import { APIAuthenticated } from "../globals/http";

const classSlice = createSlice({
  name: "class",
  initialState: {
    classesBySchool: {}, // Store classes by schoolId: { schoolId1: [], schoolId2: [] }
    status: STATUSES.LOADING,
  },
  reducers: {
    setClassesForSchool(state, action) {
      const { schoolId, classes } = action.payload;
      state.classesBySchool[schoolId] = classes;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    removeClassFromSchool(state, action) {
      const { schoolId, classId } = action.payload;
      if (state.classesBySchool[schoolId]) {
        state.classesBySchool[schoolId] = state.classesBySchool[
          schoolId
        ].filter((item) => item._id !== classId);
      }
    },
    addClassToSchool(state, action) {
      const { schoolId, class: newClass } = action.payload;
      if (!state.classesBySchool[schoolId]) {
        state.classesBySchool[schoolId] = [];
      }
      state.classesBySchool[schoolId].push(newClass);
    },
    clearAllClasses(state) {
      state.classesBySchool = {};
    },
    clearClassesForSchool(state, action) {
      const schoolId = action.payload;
      delete state.classesBySchool[schoolId];
    },
  },
});

export const {
  setClassesForSchool,
  setStatus,
  removeClassFromSchool,
  addClassToSchool,
  clearAllClasses,
  clearClassesForSchool,
} = classSlice.actions;
export default classSlice.reducer;

export function fetchClass(schoolId) {
  return async function fetchClassThunk(dispatch, getState) {
    const state = getState();
    const existingClasses = state.class.classesBySchool[schoolId];

    // Return cached data if already exists
    if (existingClasses && existingClasses.length > 0) {
      dispatch(setStatus(STATUSES.SUCCESS));
      return;
    }

    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get(`/class/add/${schoolId}`);
      if (response.status === 200) {
        dispatch(
          setClassesForSchool({
            schoolId,
            classes: response.data.data,
          })
        );
        // console.log("classes fetched for school", schoolId, response.data.data);
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
        dispatch(removeClassFromSchool({ schoolId, classId }));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function createClass(schoolId, name, description = "") {
  return async function addClassThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post(`/class/add/${schoolId}`, {
        name,
        description,
      });
      if (response.status === 200) {
        dispatch(
          addClassToSchool({
            schoolId,
            class: response.data.data,
          })
        );
        dispatch(setStatus(STATUSES.SUCCESS));
        return response.data;
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
      throw error;
    }
  };
}

// Optional:
export function getClassesForSchool(schoolId) {
  return function getClassesSelector(state) {
    return state.class.classesBySchool[schoolId] || [];
  };
}
