/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditSchool = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { schoolId } = useParams();

  //console.log("schoolId from useParams:", schoolId); // Debugging

  useEffect(() => {
    if (!schoolId) {
      setError("Invalid school ID.");
      return;
    }

    const fetchSchool = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized! Please log in first.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/school/${schoolId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setName(data.data?.name || "");
          setAddress(data.data?.address || "");
        } else {
          setError(data.message || "Failed to fetch school details.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchSchool();
  }, [schoolId]);

  const handleEditSchool = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      setError("Invalid school ID.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized! Please log in first.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/school/edit/${schoolId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ name, address }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("School updated successfully!");
        navigate("/dashboard");
      } else {
        setError(data.message || "Failed to update school.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Edit School</h2>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <form className="mt-10" onSubmit={handleEditSchool}>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-600 uppercase">
              School Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter school name"
              className="block w-full py-3 px-1 mt-2 text-gray-800 border-b-2 border-gray-100 focus:outline-none focus:border-gray-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="address" className="block text-xs font-semibold text-gray-600 uppercase mt-4">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Enter address"
              className="block w-full py-3 px-1 mt-2 text-gray-800 border-b-2 border-gray-100 focus:outline-none focus:border-gray-200"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700"
            >
              Update School
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSchool;
