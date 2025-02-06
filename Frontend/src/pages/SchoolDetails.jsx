/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SchoolDetails = () => {
  const { id: schoolId } = useParams();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view school details.");
      navigate("/login");
      return;
    }

    const fetchClasses = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/class/add/${schoolId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
      
          const result = await response.json();
      
          if (result.data) {
            // If result.data is an object, wrap it in an array
            setClasses(Array.isArray(result.data) ? result.data : [result.data]);
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

  const handleChooseClass = (classItem) => {
    // navigate(`/schoolDetails?schoolId=${schoolId}`);
     navigate(`/classDetails/${classItem}`);
     //navigate(`/classDetails`);
 
   };
 

  const handleAddClass = () => {
    navigate(`/add-class/${schoolId}`);
  };

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading classes...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-6">Classes for School</h1>

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
        <>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {classes.map((classItem) => (
              <div
                key={classItem._id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{classItem.name}</h2>
                <p className="text-gray-500 text-sm">School Name:<strong> {classItem.schoolId.name}</strong></p>
                {/* <p className="text-gray-500 text-sm">Total Students: {classItem.totalStudents}</p> */}
                
                <button
                className="mt-4 w-full px-4 py-2 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition-all"
                onClick={() => handleChooseClass(classItem._id)}
              >
                Choose
              </button>

              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
              onClick={handleAddClass}
            >
              Add Class
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SchoolDetails;
