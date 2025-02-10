/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "../components/Contact";

const Home = () => {
  const [schools, setSchools] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to get started.");
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
          if (Array.isArray(result.data)) {
            setSchools(result.data);
          } else {
            setSchools([result.data]);
          }
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

  const handleChooseSchool = (schoolId) => {
   // navigate(`/schoolDetails?schoolId=${schoolId}`);
    navigate(`/schoolDetails/${schoolId}`);

  };

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-6">Your Schools</h1>

      {schools.length === 0 ? (
        <div className="text-center mt-6">
          <p className="text-gray-600 text-lg">You don't have any school, add one to get started.</p>
          <button
            className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
            onClick={handleAddSchool}
          >
            Add New School
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {schools.map((school) => (
            <div
              key={school._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{school.name}</h2>
              <p className="text-gray-500 text-sm">{school.address}</p>
              <button
                className="mt-4 w-full px-4 py-2 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition-all"
                onClick={() => handleChooseSchool(school._id)}
              >
                Choose
              </button>
            </div>
          ))}
          <div className="col-span-full text-center mt-6">
            <button
              className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
              onClick={handleAddSchool}
            >
              Add New School
            </button>
          </div>
          
        </div>
      )}
      <Contact />
    </div>
    
  );
};

export default Home;
