import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const { schoolId, classId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view student details.");
      navigate("/login");
      return;
    }

    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/student/add/${schoolId}/${classId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch students.");
        }

        setStudents(result.data || []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [schoolId, classId, navigate]);

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading student data...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-10">Student List</h1>
      <div className="w-full border rounded-lg overflow-hidden shadow-lg">
        {students.length === 0 ? (
          <p className="text-center text-lg p-4">No students found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {students.map((student) => (
              <li key={student._id} className="flex justify-between items-center p-4">
                <span className="text-lg text-gray-700">{student.name}</span>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                  onClick={() => navigate(`/student/detail/${classId}/${student._id}`)}
                >
                  Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
