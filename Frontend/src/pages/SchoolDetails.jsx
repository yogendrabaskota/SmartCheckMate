import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaSchool,
  FaChalkboardTeacher,
  FaPlus,
  FaSignInAlt,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaSearch,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteClass, fetchClass } from "../store/classSlice";
import { STATUSES } from "../globals/misc/statuses";

const SchoolDetails = () => {
  const dispatch = useDispatch();
  const { classes, status } = useSelector((state) => state.class); // Fixed destructuring
  const { id: schoolId } = useParams();
  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const loading = status === STATUSES.LOADING; // Use ===

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view school details.");
      navigate("/login");
      return;
    }
    if (schoolId) {
      dispatch(fetchClass(schoolId));
    }
  }, [schoolId, navigate, dispatch]);

  useEffect(() => {
    if (classes.length > 0 && classes[0].schoolId) {
      setSchoolName(classes[0].schoolId.name);
    }
  }, [classes]);

  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (classItem.description &&
        classItem.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleChooseClass = (classId) => {
    navigate(`/classDetails/${schoolId}/${classId}`);
  };

  const handleEditClass = (classId) => {
    navigate(`/edit-class/${schoolId}/${classId}`);
  };

  const handleAddClass = () => {
    navigate(`/add-class/${schoolId}`);
  };

  const handleDeleteClass = async (classId) => {
    // Only need classId parameter
    if (!window.confirm("Are you sure you want to delete this class?")) {
      // Fixed message
      return;
    }
    try {
      await dispatch(deleteClass(schoolId, classId)); // schoolId from useParams
    } catch (error) {
      alert("Failed to delete class!"); // Fixed message
      console.error("Error deleting class:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-[#10B981] mb-4" />
          <p className="text-[#1F2937]">Loading classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <FaSchool className="text-3xl text-[#10B981] mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-[#1F2937]">
                {schoolName || "School Classes"}
              </h1>
              <p className="text-gray-500 text-sm">
                {classes.length} {classes.length === 1 ? "class" : "classes"}{" "}
                available
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search classes..."
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={handleAddClass}
              className="flex items-center justify-center px-6 py-2.5 bg-[#10B981] hover:bg-[#0e9e6d] text-white font-medium rounded-lg shadow-sm transition-all"
            >
              <FaPlus className="mr-2" />
              Add Class
            </button>
          </div>
        </div>

        {/* Error Message */}
        {status === STATUSES.ERROR && ( // Use ===
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            Something Went Wrong
          </div>
        )}

        {/* Classes Grid */}
        {classes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-4">
              <FaChalkboardTeacher className="text-[#10B981] text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-[#1F2937] mb-2">
              No classes found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Get started by adding the first class to this school
            </p>
            <button
              onClick={handleAddClass}
              className="px-6 py-2 bg-[#10B981] hover:bg-[#0e9e6d] text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Create First Class
            </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((classItem) => (
              <div
                key={classItem._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-[#1F2937] line-clamp-1">
                        {classItem.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {classItem.schoolId?.name || "N/A"}
                      </p>
                    </div>
                    <div className="bg-[#f0fdf4] text-[#10B981] text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Active
                    </div>
                  </div>

                  {classItem.description && (
                    <div className="text-sm text-gray-600 mt-4">
                      <p className="line-clamp-2">{classItem.description}</p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-6 py-3 flex justify-between border-t border-gray-200">
                  <button
                    onClick={() => handleChooseClass(classItem._id)}
                    className="flex items-center text-[#10B981] hover:text-[#0e9e6d] text-sm font-medium transition-colors"
                    title="Enter Class"
                  >
                    <FaSignInAlt className="mr-1.5" />
                    View
                  </button>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditClass(classItem._id)}
                      className="text-gray-500 hover:text-[#1F2937] transition-colors"
                      title="Edit Class"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClass(classItem._id)} // Only pass classId
                      className="text-gray-500 hover:text-[#ef4444] transition-colors"
                      title="Delete Class"
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

export default SchoolDetails;
