import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaUser,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaChartBar,
  FaRegCalendarCheck,
} from "react-icons/fa";

const PersonalAttendance = () => {
  const { classId, studentId } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [lastFiveDays, setLastFiveDays] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAttendance = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://smartcheckmate.onrender.com/api/student/do/${classId}/${studentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch attendance.");
        }

        setAttendance(result.data || []);
        setCount(
          result.data
            ? result.data.filter((entry) => entry.remarks === "present").length
            : 0
        );

        if (result.data.length > 0) {
          setStudentName(result.data[0].studentId.name);
        }

        const lastFive = getLastFiveDays(result.data);
        setLastFiveDays(lastFive);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setError(error.message || "Failed to load attendance data.");
        setAttendance([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [classId, studentId, navigate]);

  const getLastFiveDays = (data) => {
    const today = new Date();
    const lastFive = [];

    for (let i = 4; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0];

      const entry = data.find((entry) =>
        entry.createdAt.startsWith(formattedDate)
      );

      lastFive.push({
        date: formattedDate,
        present: entry ? entry.remarks === "present" : false,
      });
    }

    return lastFive;
  };

  const attendancePercentage =
    attendance.length > 0 ? Math.round((count / attendance.length) * 100) : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-[#10B981] mb-4" />
          <p className="text-[#1F2937]">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-[#10B981] hover:text-[#0e9e6d] mr-4 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#1F2937] flex items-center">
                <FaUser className="text-[#10B981] mr-2" />
                Attendance Details
              </h1>
              <p className="text-sm text-gray-500">
                {attendance.length} records available
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Student Info and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Student Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-[#f0fdf4] rounded-full flex items-center justify-center mb-4">
              <FaUser className="text-[#10B981] text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">
              {studentName || "Student"}
            </h2>
            <p className="text-gray-500 mb-4">Class ID: {classId}</p>
          </div>

          {/* Attendance Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-center mb-4">
              <FaChartBar className="text-[#10B981] mr-2" />
              <h2 className="text-lg font-semibold text-[#1F2937]">
                Attendance Summary
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f0fdf4] p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-[#10B981]">{count}</p>
                <p className="text-sm text-gray-500">Present Days</p>
              </div>
              <div className="bg-[#f0fdf4] p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-[#10B981]">
                  {attendancePercentage}%
                </p>
                <p className="text-sm text-gray-500">Attendance Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Last 5 Days Attendance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaCalendarAlt className="text-[#10B981] mr-2" />
            <h2 className="text-lg font-semibold text-[#1F2937]">
              Recent Attendance
            </h2>
          </div>
          <div className="flex justify-center gap-4 overflow-x-auto py-2">
            {lastFiveDays.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[60px]"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${
                    day.present ? "bg-[#10B981]" : "bg-[#ef4444]"
                  } text-white`}
                >
                  {day.present ? <FaCheck /> : <FaTimes />}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <p className="text-xs font-medium text-[#1F2937]">
                  {new Date(day.date).getDate()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Records */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 bg-[#f0fdf4] border-b border-gray-200 flex items-center">
            <FaRegCalendarCheck className="text-[#10B981] mr-2" />
            <h2 className="text-lg font-semibold text-[#1F2937]">
              Attendance History
            </h2>
          </div>
          {attendance.length === 0 ? (
            <div className="text-center p-8">
              <div className="mx-auto w-24 h-24 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-4">
                <FaCalendarAlt className="text-[#10B981] text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-[#1F2937] mb-2">
                No attendance records
              </h3>
              <p className="text-gray-500">
                Attendance records will appear here once marked
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {attendance
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((entry) => (
                  <li
                    key={entry._id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          entry.remarks === "present"
                            ? "bg-[#10B981]/10"
                            : "bg-[#ef4444]/10"
                        }`}
                      >
                        {entry.remarks === "present" ? (
                          <FaCheck className="text-[#10B981]" />
                        ) : (
                          <FaTimes className="text-[#ef4444]" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="text-lg text-[#1F2937]">
                          {entry.remarks === "present" ? "Present" : "Absent"}{" "}
                          on{" "}
                          {new Date(entry.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(entry.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalAttendance;
