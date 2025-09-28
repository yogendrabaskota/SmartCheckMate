import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/statuses";
import { APIAuthenticated } from "../globals/http";

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendanceRecords: [],
    className: "",

    status: STATUSES.IDLE,
  },
  reducers: {
    setAttendanceRecords(state, action) {
      state.attendanceRecords = action.payload.attendanceRecords;
      state.className = action.payload.className;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export const { setAttendanceRecords, setStatus } = attendanceSlice.actions;
export default attendanceSlice.reducer;

export function fetchAttendanceRecords(classId) {
  return async function fetchAttendanceRecordsThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get(`/student/getAll/${classId}`);

      if (response.status == 200) {
        // const data = response.data;
        console.log("Fetched attendance records:", response.data.dates);
        const { dates, data } = response.data;
        dispatch(
          setAttendanceRecords({
            attendanceRecords: dates || [],
            className: data || "",
          })
        );
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(error.message);
    }
  };
}
