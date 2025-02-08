import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AttendanceDetails = () => {
  const { classId, date } = useParams();
  const [presentCount, setPresentCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/student/present-count/${classId}/${date}`,
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
          throw new Error(result.message || "Failed to fetch attendance details.");
        }

        setPresentCount(result.count || 0);
        setStudents(result.students || []);
      } catch (error) {
        console.error("Error fetching attendance details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceDetails();
  }, [classId, date]);

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading attendance details...</p>;
  }

  return (
    <div className="container mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mt-6">
        Total Present Students: {presentCount}
      </h1>

      {students.length === 0 ? (
        <p className="text-center text-lg text-gray-600 mt-6">No students were present.</p>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Present Students:</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {students.map((student) => (
              <li key={student.id} className="text-lg font-medium">{student.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetails;