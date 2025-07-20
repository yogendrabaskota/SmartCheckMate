import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaSpinner,
  FaUserCheck,
  FaArrowLeft,
  FaClipboardList,
} from "react-icons/fa";

const AttendanceDetails = () => {
  const { classId, date } = useParams();
  const [presentCount, setPresentCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `https://smartcheckmate.onrender.com/api/student/present-count/${classId}/${date}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch attendance details."
          );
        }

        setPresentCount(result.count || 0);
        setStudents(result.students || []);
      } catch (error) {
        console.error("Error fetching attendance details:", error);
        setError(error.message || "Failed to load attendance details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceDetails();
  }, [classId, date, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f0fdf4]">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-[#10B981] mb-4" />
          <p className="text-[#1F2937]">Loading attendance details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0fdf4] p-6 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#10B981] hover:text-[#0e9e6d] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] flex items-center">
            <FaClipboardList className="text-[#10B981] mr-2" />
            Attendance Details
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Present Count */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-[#e5e7eb] mb-8 text-center">
          <div className="flex items-center justify-center">
            <FaUserCheck className="text-4xl text-[#10B981] mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-[#6b7280]">
                Total Present Students
              </h2>
              <p className="text-4xl font-bold text-[#10B981]">
                {presentCount}
              </p>
              <p className="text-sm text-[#6b7280] mt-2">
                Date: {new Date(date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Present Students List */}
        {students.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl border-2 border-dashed border-[#10B981]/50">
            <p className="text-[#1F2937] text-lg">
              No students were present on this day
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-[#e5e7eb] overflow-hidden">
            <div className="p-4 bg-[#10B981]/10 border-b border-[#e5e7eb]">
              <h2 className="text-lg font-semibold text-[#1F2937]">
                Present Students
              </h2>
            </div>
            <ul className="divide-y divide-[#e5e7eb]">
              {students.map((student) => (
                <li
                  key={student.id}
                  className="p-4 hover:bg-[#f8fafc] transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center mr-4">
                      <FaUserCheck className="text-[#10B981]" />
                    </div>
                    <span className="text-lg text-[#1F2937]">
                      {student.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceDetails;
