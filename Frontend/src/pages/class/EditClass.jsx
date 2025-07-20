/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaSpinner,
  FaChalkboardTeacher,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";

const EditClass = () => {
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { schoolId, classId } = useParams();

  useEffect(() => {
    if (!schoolId || !classId) {
      setError("Invalid class ID.");
      return;
    }

    const fetchClass = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized! Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://smartcheckmate.onrender.com/api/class/${schoolId}/${classId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setClassName(data.data[0]?.name || "");
        } else {
          setError(data.message || "Failed to fetch class details.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [schoolId, classId]);

  const handleEditClass = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized! Please log in first.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://smartcheckmate.onrender.com/api/class/${schoolId}/${classId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ name: className }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Class updated successfully!");
        navigate(`/schoolDetails/${schoolId}`);
      } else {
        setError(data.message || "Failed to update class.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f0fdf4]">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-[#10B981] mb-4" />
          <p className="text-[#1F2937]">Loading class details...</p>
        </div>
      </div>
    );
  }

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
              Edit Class
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleEditClass}>
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
                placeholder="Enter new class name"
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
                disabled={isSubmitting}
                className={`flex-1 px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#0e9e6d] transition-colors flex items-center justify-center ${
                  isSubmitting ? "opacity-75" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Update Class
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClass;
