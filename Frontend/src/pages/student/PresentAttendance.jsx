import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PersonalAttendance = () => {
  const { classId, studentId } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [lastFiveDays, setLastFiveDays] = useState([]);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view attendance.");
      navigate("/login");
      return;
    }

    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/student/do/${classId}/${studentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        const result = await response.json();

       // console.log(result)

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch attendance.");
        }

        setAttendance(result.data || []);
        setCount(result.data ? result.data.filter(entry => entry.remarks === "present").length : 0);


        if (result.data.length > 0) {
          setStudentName(result.data[0].studentId.name);
        }

        const lastFive = getLastFiveDays(result.data);
        setLastFiveDays(lastFive);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendance([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [classId, studentId, navigate]);

  // Function to get last five days of attendance
  const getLastFiveDays = (data) => {
    const today = new Date();
    const lastFive = [];

    for (let i = 4; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0];

      // Find attendance entry for this date
      const entry = data.find((entry) => entry.createdAt.startsWith(formattedDate));

      lastFive.push({
        date: formattedDate,
        present: entry ? entry.remarks === "present" : false, // Check remarks field
      });
    }

    return lastFive;
  };

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading attendance data...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center mt-10">
        Attendance Details of {studentName}
      </h1>

      <p className="text-xl font-semibold text-center text-green-600">
        Total Present Days: {count}
      </p>

      {attendance.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No attendance records found.</p>
      ) : (
        <div className="w-full max-w-2xl mx-auto mt-6">
          {attendance.map((entry) => (
            <div
              key={entry._id}
              className="bg-white p-4 mb-4 rounded-lg shadow-md border"
            >
              <p className="text-lg text-gray-800">
                Present on:{" "}
                <span className="font-semibold">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Last 5 Days Attendance Display */}
      <div className="text-center mt-8">
        <p className="text-lg font-semibold text-gray-700">
          Last 5 Days Attendance
        </p>
        <div className="flex justify-center gap-2 mt-3">
          {lastFiveDays.map((day, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                day.present ? "bg-green-500" : "bg-red-500"
              } text-white font-bold`}
              title={day.date}
            >
              {day.present ? "✓" : "✗"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalAttendance;
