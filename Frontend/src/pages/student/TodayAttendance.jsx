/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TodayAttendance = () => {
  const { schoolId, classId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      setError("");
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to view attendance.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/student/add/${schoolId}/${classId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        const result = await response.json();
        console.log(result)

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
  }, [schoolId, classId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Today's Attendance</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-700">Loading students...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : students.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No students found.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          {students.map((student, index) => (
            <div
              key={student._id || index}
              className="p-3 border-b last:border-b-0 text-gray-800 text-lg font-medium"
            >
              {index + 1}. {student.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayAttendance;
