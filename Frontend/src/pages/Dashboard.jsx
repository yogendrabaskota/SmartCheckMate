/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSchool,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignInAlt,
  FaSearch,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../globals/misc/statuses";
import { deleteSchool, fetchSchool } from "../store/schoolSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { schools, status } = useSelector((state) => state.school);
  const { currentSchool } = useSelector((state) => state.school);
  console.log("single school", currentSchool);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to access the dashboard.");
      navigate("/login");
      return;
    }
    dispatch(fetchSchool());
  }, [navigate, dispatch]);

  const handleAddSchool = () => {
    navigate("/add-school");
  };

  const handleEditSchool = (schoolId) => {
    navigate(`/school/edit/${schoolId}`);
  };

  const handleEnterSchool = (schoolId) => {
    navigate(`/schoolDetails/${schoolId}`);
  };

  const handleDeleteSchool = async (schoolId) => {
    if (!window.confirm("Are you sure you want to delete this school?")) {
      return;
    }
    try {
      await dispatch(deleteSchool(schoolId));
    } catch (error) {
      alert("Failed to delete school!");
      console.error("Error deleting school:", error);
    }
  };

  const filteredSchools = schools?.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === STATUSES.ERROR) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10B981]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1F2937] flex items-center">
              <FaSchool className="text-[#10B981] mr-3" />
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              {schools?.length} {schools?.length === 1 ? "school" : "schools"}{" "}
              registered
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search schools..."
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              className="flex items-center justify-center px-6 py-2.5 bg-[#10B981] hover:bg-[#0e9e6d] text-white font-medium rounded-lg shadow-sm transition-all"
              onClick={handleAddSchool}
            >
              <FaPlus className="mr-2" />
              Add School
            </button>
          </div>
        </div>

        {/* Empty State */}
        {schools?.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-4">
              <FaSchool className="text-[#10B981] text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-[#1F2937] mb-2">
              No schools found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Get started by adding your first school to the system
            </p>
            <button
              className="px-6 py-2 bg-[#10B981] hover:bg-[#0e9e6d] text-white font-medium rounded-lg shadow-sm transition-colors"
              onClick={handleAddSchool}
            >
              Create First School
            </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSchools?.map((school) => (
              <div
                key={school._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-[#1F2937] line-clamp-1">
                        {school.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {school.address}
                      </p>
                    </div>
                    <div className="bg-[#f0fdf4] text-[#10B981] text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Active
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    {school.phone && (
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        {school.phone}
                      </div>
                    )}
                    {school.email && (
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="truncate">{school.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-3 flex justify-between border-t border-gray-200">
                  <button
                    onClick={() => handleEnterSchool(school._id)}
                    className="flex items-center text-[#10B981] hover:text-[#0e9e6d] text-sm font-medium transition-colors"
                    title="Enter School"
                  >
                    <FaSignInAlt className="mr-1.5" />
                    View
                  </button>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditSchool(school._id)}
                      className="text-gray-500 hover:text-[#1F2937] transition-colors"
                      title="Edit School"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteSchool(school._id)}
                      className="text-gray-500 hover:text-[#ef4444] transition-colors"
                      title="Delete School"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
