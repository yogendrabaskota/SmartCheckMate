/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditClass = () => {
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { schoolId, classId } = useParams();

  useEffect(() => {
    if (!schoolId || !classId) {
      setError("Invalid class ID.");
      return;
    }

    const fetchClass = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized! Please log in first.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/class/${schoolId}/${classId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        const data = await response.json();
       // console.log(data)
        //console.log("data data name",data.data[0].name)
        if (response.ok) {
          setClassName(data.data[0]?.name || "");
        } else {
          setError(data.message || "Failed to fetch class details.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchClass();
  }, [schoolId, classId]);

  const handleEditClass = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized! Please log in first.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/class/${schoolId}/${classId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ name: className }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Class updated successfully!");
        navigate(`/schoolDetails/${schoolId}`);
      } else {
        setError(data.message || "Failed to update class.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Edit Class</h2>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <form className="mt-10" onSubmit={handleEditClass}>
            <label htmlFor="className" className="block text-xs font-semibold text-gray-600 uppercase">
              Class Name
            </label>
            <input
              id="className"
              type="text"
              name="className"
              placeholder="Enter new class name"
              className="block w-full py-3 px-1 mt-2 text-gray-800 border-b-2 border-gray-100 focus:outline-none focus:border-gray-200"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700"
            >
              Update Class
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClass;