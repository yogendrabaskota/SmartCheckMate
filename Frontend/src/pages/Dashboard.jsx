import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [schools, setSchools] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to access the dashboard.");
      navigate("/login");
      return;
    }

    const fetchSchools = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/school/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        const result = await response.json();

        if (result.data) {
          setSchools(Array.isArray(result.data) ? result.data : [result.data]);
        } else {
          setSchools([]);
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
        setSchools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [navigate]);

  const handleAddSchool = () => {
    navigate("/add-school");
  };

  const handleEditSchool = (schoolId) => {
    navigate(`/school/edit/${schoolId}`);
  };

  const handleEnterSchool = (schoolId) => {
    navigate(`/schoolDetails/${schoolId}`);
  };

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-6">
        Dashboard
      </h1>

      {schools.length === 0 ? (
        <div className="text-center mt-6">
          <p className="text-gray-600 text-lg">
            No schools found. Add one to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {schools.map((school) => (
            <div
              key={school._id}
              className="bg-gradient-to-br from-blue-100 to-gray-100 p-6 h-48 rounded-xl shadow-lg border border-gray-300 
              hover:shadow-2xl hover:scale-105 transition-all flex flex-col justify-between"
            >
              <h2 className="text-xl font-bold text-blue-900">{school.name}</h2>
              <p className="text-gray-600 text-sm"> <strong>Located At: </strong> {school.address}</p>
              {/* <p className="text-gray-600 text-sm">
                <strong>Created By: </strong> {school.createdBy}
              </p> */}

              {/* Buttons Wrapper */}
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-lg 
                  hover:bg-yellow-600 transition-all flex-1 mr-2"
                  onClick={() => handleEditSchool(school._id)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg 
                  hover:bg-green-700 transition-all flex-1"
                  onClick={() => handleEnterSchool(school._id)}
                >
                  Enter
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
       <div className="text-center mt-6">
        <button
          className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
          onClick={handleAddSchool}
        >
          Add New School
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
