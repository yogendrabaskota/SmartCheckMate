import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaUser,
  FaArrowLeft,
  FaInfoCircle,
  FaSearch,
  FaUserPlus,
  FaIdCard,
} from "react-icons/fa";

const StudentDetails = () => {
  const { schoolId, classId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view student details.");
      navigate("/login");
      return;
    }

    const fetchStudents = async () => {
      setLoading(true);
      setError("");
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
        setError(error.message || "Failed to load students.");
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [schoolId, classId, navigate]);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-[#10B981] mb-4" />
          <p className="text-[#1F2937]">Loading student data...</p>
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
              onClick={() => navigate(`/classDetails/${schoolId}/${classId}`)}
              className="flex items-center text-[#10B981] hover:text-[#0e9e6d] mr-4 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#1F2937] flex items-center">
                <FaUser className="text-[#10B981] mr-2" />
                Student List
              </h1>
              <p className="text-sm text-gray-500">
                {students.length}{" "}
                {students.length === 1 ? "student" : "students"} enrolled
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {students.length > 0 && (
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            <button
              onClick={() => navigate(`/student/add/${schoolId}/${classId}`)}
              className="flex items-center justify-center px-4 py-2.5 bg-[#10B981] hover:bg-[#0e9e6d] text-white font-medium rounded-lg shadow-sm transition-all"
            >
              <FaUserPlus className="mr-2" />
              Add Student
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Student List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredStudents.length === 0 ? (
            <div className="text-center p-8">
              <div className="mx-auto w-24 h-24 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-4">
                {searchTerm ? (
                  <FaSearch className="text-[#10B981] text-3xl" />
                ) : (
                  <FaUser className="text-[#10B981] text-3xl" />
                )}
              </div>
              <h3 className="text-lg font-medium text-[#1F2937] mb-2">
                {searchTerm
                  ? "No matching students found"
                  : "No students in this class"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? "Try a different search term"
                  : "Add students to get started"}
              </p>
              <button
                onClick={() => navigate(`/student/add/${schoolId}/${classId}`)}
                className="px-6 py-2 bg-[#10B981] hover:bg-[#0e9e6d] text-white font-medium rounded-lg shadow-sm transition-colors"
              >
                Add New Student
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <li
                  key={student._id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center mr-4">
                        <FaUser className="text-[#10B981]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-[#1F2937]">
                          {student.name}
                        </h3>
                        {student.rollNumber && (
                          <p className="text-sm text-gray-500 flex items-center">
                            <FaIdCard className="mr-1" />
                            Roll No: {student.rollNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/student/detail/${classId}/${student._id}`)
                      }
                      className="flex items-center px-4 py-2 bg-white border border-[#10B981] text-[#10B981] rounded-lg hover:bg-[#f0fdf4] transition-colors"
                    >
                      <FaInfoCircle className="mr-2" />
                      View
                    </button>
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

export default StudentDetails;
