import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ClassDetails = () => {
  const { id: classId } = useParams();
  const [className, setClassName] = useState("");
  const [attendanceGroups, setAttendanceGroups] = useState({});
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
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch attendance.");
        }

        // Grouping attendances by date
        const groupedData = {};
        result.data.forEach((attendance) => {
          const date = new Date(attendance.createdAt).toLocaleDateString(); // Get only the date
          if (!groupedData[date]) {
            groupedData[date] = [];
          }
          groupedData[date].push(attendance);
        });

        setAttendanceGroups(groupedData);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendanceGroups({});
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

      {Object.keys(attendanceGroups).length === 0 ? (
        <div className="text-center mt-6">
          <p className="text-gray-600 text-lg">No attendance records found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Object.entries(attendanceGroups).map(([date, attendances]) => (
            <div
              key={date}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Date: {date}</h2>
              <p className="text-gray-600">
                Attendance Count: <strong>{attendances.length}</strong>
              </p>
              <p className="text-gray-500 text-sm">Sample Student: {attendances[0].studentId}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
          DO Today
        </button>
      </div>
    </div>
  );
};

export default ClassDetails;
