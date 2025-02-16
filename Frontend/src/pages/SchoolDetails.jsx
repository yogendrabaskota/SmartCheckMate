import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SchoolDetails = () => {
  const { id: schoolId } = useParams();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view school details.");
      navigate("/login");
      return;
    }

    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/class/add/${schoolId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        const result = await response.json();

        if (result.data) {
          setClasses(Array.isArray(result.data) ? result.data : [result.data]);

          if (result.data.length > 0 && result.data[0].schoolId) {
            setSchoolName(result.data[0].schoolId.name);
          }
        } else {
          setClasses([]);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    if (schoolId) {
      fetchClasses();
    }
  }, [schoolId, navigate]);

  const handleChooseClass = (classId) => {
    navigate(`/classDetails/${schoolId}/${classId}`);
  };

  const handleEditClass = (classId) => {
    navigate(`/edit-class/${schoolId}/${classId}`);
  };

  const handleAddClass = () => {
    navigate(`/add-class/${schoolId}`);
  };

  const handleDeleteClass = async (classId) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this class?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/class/${schoolId}/${classId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setClasses(classes.filter((classItem) => classItem._id !== classId));
        alert("Class deleted successfully!");
      } else {
        alert(data.message || "Failed to delete class.");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading classes...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-6">
        Classes for {schoolName}
      </h1>

      {classes.length === 0 ? (
        <div className="text-center mt-6">
          <p className="text-gray-600 text-lg">No classes found for this school.</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
            onClick={handleAddClass}
          >
            Add Class
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className="bg-gradient-to-br from-blue-100 to-gray-100 p-6 h-48 rounded-xl shadow-lg border border-gray-300 
              hover:shadow-2xl hover:scale-105 transition-all flex flex-col justify-between"
            >
              <h2 className="text-xl font-bold text-blue-900">{classItem.name}</h2>
              <p className="text-gray-600 text-sm">
                <strong>School Name: </strong> {classItem.schoolId.name}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  className="px-2 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg 
                  hover:bg-green-700 transition-all w-full"
                  onClick={() => handleChooseClass(classItem._id)}
                >
                  Enter
                </button>
                <button
                  className="px-2 py-2 bg-yellow-500 text-white text-sm font-medium rounded-lg 
                  hover:bg-yellow-600 transition-all w-full"
                  onClick={() => handleEditClass(classItem._id)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-2 bg-red-500 text-white text-sm font-medium rounded-lg 
                  hover:bg-red-600 transition-all w-full"
                  onClick={() => handleDeleteClass(classItem._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-6">
        <button
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
          onClick={handleAddClass}
        >
          Add Class
        </button>
      </div>
    </div>
  );
};

export default SchoolDetails;
