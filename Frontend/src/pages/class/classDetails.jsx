import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ClassDetails = () => {
  const { id: classId } = useParams();
  const [className, setClassName] = useState("");
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view class details.");
      return;
    }

    const fetchAttendances = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/student/getAll/${classId}`, {
          method: "GET", // Now using GET request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Added Bearer
          },
        });

        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch attendance.");
        }

        setAttendances(result.data || []);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendances([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, [classId]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/class/${classId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch class details.");
        }

        if (result.data) {
          setClassName(result.data.name);
        }
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [classId]);

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading attendances...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-6">{className}</h1>

      {attendances.length === 0 ? (
        <div className="text-center mt-6">
          <p className="text-gray-600 text-lg">No attendance records found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {attendances.map((attendance) => (
            <div
              key={attendance._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Student ID: {attendance.studentId}</h2>
              <p className="text-gray-600">Remarks: <strong>{attendance.remarks}</strong></p>
              <p className="text-gray-500 text-sm">Date: {new Date(attendance.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          DO Today
        </button>
      </div>
    </div>
  );
};

export default ClassDetails;
