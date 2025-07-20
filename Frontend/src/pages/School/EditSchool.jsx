/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSchool, FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";

const EditSchool = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { schoolId } = useParams();

  useEffect(() => {
    if (!schoolId) {
      setError("Invalid school ID.");
      return;
    }

    const fetchSchool = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized! Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://smartcheckmate.onrender.com/api/school/${schoolId}`,
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
          setName(data.data?.name || "");
          setAddress(data.data?.address || "");
        } else {
          setError(data.message || "Failed to fetch school details.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [schoolId]);

  const handleEditSchool = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!schoolId) {
      setError("Invalid school ID.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized! Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://smartcheckmate.onrender.com/api/school/edit/${schoolId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ name, address }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Failed to update school.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#10B981] p-6 text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white hover:text-[#1F2937] transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            <h2 className="text-2xl font-bold flex items-center">
              <FaSchool className="mr-3" />
              Edit School
            </h2>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          {loading && !name ? (
            <div className="flex justify-center items-center h-40">
              <FaSpinner className="animate-spin text-4xl text-[#10B981]" />
            </div>
          ) : (
            <form onSubmit={handleEditSchool}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#1F2937] mb-2"
                >
                  School Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter school name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-[#1F2937] mb-2"
                >
                  School Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter school address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] transition"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 flex items-center justify-center rounded-lg text-white font-semibold transition-colors shadow-md ${
                  loading
                    ? "bg-[#10B981]/70"
                    : "bg-[#10B981] hover:bg-[#0e9e6d]"
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Update School
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSchool;
