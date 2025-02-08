import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddStudent = () => {
  const { schoolId, classId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/student/add/${schoolId}/${classId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();

      if (response.status === 200) {
        alert("Student added successfully!");
        navigate(`/classDetails/${schoolId}/${classId}`); // ✅ Redirect back
      } else {
        throw new Error(result.message || "Failed to add student.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Add Student</h2>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <form className="mt-10" onSubmit={handleSubmit}>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-600 uppercase">
              Student Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter student name"
              className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
              disabled={loading}
            >
              {loading ? "Adding..." : "Submit"}
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <button
                type="button"
                className="flex-1 text-gray-500 underline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
