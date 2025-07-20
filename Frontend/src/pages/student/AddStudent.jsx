import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSpinner, FaUserPlus, FaArrowLeft } from "react-icons/fa";

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
      const response = await fetch(
        `https://smartcheckmate.onrender.com/api/student/add/${schoolId}/${classId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        // navigate(`/classDetails/${schoolId}/${classId}`);
        navigate(`/student/details/${schoolId}/${classId}`);
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
    <div className="min-h-screen bg-[#f0fdf4] p-6 mt-20">
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#e5e7eb]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-[#10B981] hover:text-[#0e9e6d] transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            <h2 className="text-2xl font-bold text-[#1F2937] flex items-center">
              <FaUserPlus className="text-[#10B981] mr-2" />
              Add Student
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#1F2937] mb-1"
              >
                Student Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                placeholder="e.g. John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-4 py-2 bg-white border border-[#e5e7eb] text-[#1F2937] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#0e9e6d] transition-colors flex items-center justify-center ${
                  loading ? "opacity-75" : ""
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
