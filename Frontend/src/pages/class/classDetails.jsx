import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ClassDetails = () => {
  const { id: classId, schoolId } = useParams();
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [attendanceData, setAttendanceData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view class details.");
      return;
    }

    const fetchAttendanceDates = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/student/getAll/${classId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch attendance.");
        }

        setAttendanceDates(result.dates || []);
        setAttendanceData(result.data || "");
      } catch (error) {
        console.error("Error fetching attendance dates:", error);
        setAttendanceDates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceDates();
  }, [classId]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/class/add/${classId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
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
    return <p className="text-center text-lg mt-10">Loading attendance data...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{className}</h1>
        <button 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          onClick={() => navigate(`/student/add/${schoolId}/${classId}`)}
        >
          Add Student
        </button>
      </div>
      <p className="text-center text-lg font-semibold text-gray-700 mb-4">{attendanceData}</p>

      {attendanceDates.length === 0 ? (
        <div className="text-center mt-6">
          <p className="text-gray-600 text-lg">No attendance records found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {attendanceDates.map((date, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{date}</h2>
              <p className="text-gray-600">Attendance recorded on this day.</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all">
                See Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
