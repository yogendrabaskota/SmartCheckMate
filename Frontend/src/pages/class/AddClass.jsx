/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSpinner, FaChalkboardTeacher, FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createClass } from "../../store/classSlice";

const AddClass = () => {
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id: schoolId } = useParams();
  const dispatch = useDispatch();

  const handleAddClass = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized! Please log in first.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await dispatch(createClass(schoolId, className));

      if (result?.error) {
        setError(result.error.message || "Failed to add class.");
      } else {
        navigate(`/schoolDetails/${schoolId}`);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Add class error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] p-6 mt-20">
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#e5e7eb]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(`/schoolDetails/${schoolId}`)}
              className="flex items-center text-[#10B981] hover:text-[#0e9e6d] transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            <h2 className="text-2xl font-bold text-[#1F2937] flex items-center">
              <FaChalkboardTeacher className="text-[#10B981] mr-2" />
              Add New Class
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleAddClass}>
            <div>
              <label
                htmlFor="className"
                className="block text-sm font-medium text-[#1F2937] mb-1"
              >
                Class Name
              </label>
              <input
                id="className"
                name="className"
                type="text"
                required
                className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                placeholder="e.g. Grade 10 Mathematics"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate(`/schoolDetails/${schoolId}`)}
                className="flex-1 px-4 py-2 bg-white border border-[#e5e7eb] text-[#1F2937] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#0e9e6d] transition-colors flex items-center justify-center ${
                  isLoading ? "opacity-75" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Add Class"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
