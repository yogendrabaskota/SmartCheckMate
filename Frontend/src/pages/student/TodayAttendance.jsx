import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaClipboardCheck,
  FaArrowLeft,
  FaUser,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const TodayAttendance = () => {
  const { schoolId, classId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      setError("");
      setSuccess("");
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `https://smartcheckmate.onrender.com/api/student/add/${schoolId}/${classId}`,
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
          throw new Error(result.message || "Failed to fetch students.");
        }

        setStudents(result.data || []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [schoolId, classId, navigate]);

  const handleAttendance = async (studentId, status) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://smartcheckmate.onrender.com/api/student/do/${classId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            studentId,
            remarks: status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to mark attendance.");
      }

      setSuccess(`Attendance marked as "${status}" for student.`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error marking attendance:", error);
      setError(error.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] p-4 sm:p-6 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <button
            onClick={() => navigate(`/classDetails/${schoolId}/${classId}`)}
            className="flex items-center text-[#10B981] hover:text-[#0e9e6d] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Class
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] flex items-center">
            <FaClipboardCheck className="text-[#10B981] mr-2" />
            Today&apos;s Attendance
          </h1>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Student List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-[#10B981] mr-4" />
            <span className="text-[#1F2937]">Loading students...</span>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl border-2 border-dashed border-[#10B981]/50">
            <FaUser className="mx-auto text-4xl text-[#10B981] mb-4" />
            <p className="text-[#1F2937] text-lg">
              No students found in this class
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-[#e5e7eb] overflow-hidden">
            <div className="p-4 bg-[#10B981]/10 border-b border-[#e5e7eb]">
              <h2 className="text-lg font-semibold text-[#1F2937]">
                Mark Attendance
              </h2>
              <p className="text-sm text-[#6b7280]">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <ul className="divide-y divide-[#e5e7eb]">
              {students.map((student, index) => (
                <li
                  key={student._id || index}
                  className="p-4 hover:bg-[#f8fafc] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center mr-3">
                        <FaUser className="text-[#10B981]" />
                      </div>
                      <span className="text-lg text-[#1F2937]">
                        {index + 1}. {student.name}
                      </span>
                    </div>
                    <div className="flex gap-2 sm:gap-3 justify-end sm:justify-normal">
                      <button
                        onClick={() => handleAttendance(student._id, "present")}
                        className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#0e9e6d] transition-colors text-sm sm:text-base"
                      >
                        <FaCheck className="mr-1 sm:mr-2" />
                        Present
                      </button>
                      <button
                        onClick={() => handleAttendance(student._id, "absent")}
                        className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-[#ef4444] text-white rounded-lg hover:bg-[#dc2626] transition-colors text-sm sm:text-base"
                      >
                        <FaTimes className="mr-1 sm:mr-2" />
                        Absent
                      </button>
                    </div>
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

export default TodayAttendance;
