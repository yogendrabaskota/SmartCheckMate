import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaUserPlus,
  FaClipboardCheck,
  FaUsers,
  FaArrowLeft,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceRecords } from "../../store/attendanceSlice";

const ClassDetails = () => {
  const dispatch = useDispatch();
  const { status, attendanceRecords } = useSelector(
    (state) => state.attendance
  );
  const { schoolId, classId } = useParams();
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view class details.");
      navigate("/login");
      return;
    }

    dispatch(fetchAttendanceRecords(classId));
  }, [classId, dispatch, navigate]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/class/add/${classId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch class details.");
        }

        if (result.data) {
          setClassName(result.data.name);
        }
      } catch (error) {
        console.error("Error fetching class details:", error);
        setError(error.message || "Failed to load class details.");
      }
    };

    fetchClassDetails();
  }, [classId]);

  // filter dates from Redux state
  const filteredDates = attendanceRecords.filter((date) =>
    date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-[#10B981] mb-4" />
          <p className="text-[#1F2937]">Loading class details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <button
        onClick={() => navigate(`/schoolDetails/${schoolId}`)}
        className="flex items-center text-[#10B981] hover:text-[#0e9e6d] mr-4 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            {/* <button
              onClick={() => navigate(`/schoolDetails/${schoolId}`)}
              className="flex items-center text-[#10B981] hover:text-[#0e9e6d] mr-4 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button> */}
            <div>
              <h1 className="text-2xl font-bold text-[#1F2937]">
                {className || "Class Details"}
              </h1>
              <p className="text-sm text-gray-500">
                {attendanceRecords.length} attendance records
              </p>
            </div>
          </div>

          {attendanceRecords.length > 0 && (
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search dates..."
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Attendance Cards */}
        {filteredDates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-4">
              <FaCalendarAlt className="text-[#10B981] text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-[#1F2937] mb-2">
              No attendance records found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "No matching dates found"
                : "Take attendance to get started"}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDates.map((date, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-[#1F2937]">
                        {date}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Attendance recorded
                      </p>
                    </div>
                    <div className="bg-[#f0fdf4] text-[#10B981] text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Complete
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 bg-[#10B981] hover:bg-[#0e9e6d] text-white font-medium rounded-lg transition-colors"
                    onClick={() =>
                      navigate(`/studentdetails/${classId}/${date}`)
                    }
                  >
                    View Attendance Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Add Student */}
          <button
            onClick={() => navigate(`/student/add/${schoolId}/${classId}`)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#10B981]/30 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-3">
              <FaUserPlus className="text-[#10B981] text-xl" />
            </div>
            <h3 className="text-lg font-medium text-[#1F2937] mb-1">
              Add Student
            </h3>
            <p className="text-sm text-gray-500 text-center">
              Register new students to this class
            </p>
          </button>

          {/* Today’s Attendance */}
          <button
            onClick={() => navigate(`/attendance/today/${schoolId}/${classId}`)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#10B981]/30 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-3">
              <FaClipboardCheck className="text-[#10B981] text-xl" />
            </div>
            <h3 className="text-lg font-medium text-[#1F2937] mb-1">
              Today&apos;s Attendance
            </h3>
            <p className="text-sm text-gray-500 text-center">
              Mark attendance for today
            </p>
          </button>

          {/* Student Details */}
          <button
            onClick={() => navigate(`/student/details/${schoolId}/${classId}`)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#10B981]/30 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-3">
              <FaUsers className="text-[#10B981] text-xl" />
            </div>
            <h3 className="text-lg font-medium text-[#1F2937] mb-1">
              Student Details
            </h3>
            <p className="text-sm text-gray-500 text-center">
              View all students in this class
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
