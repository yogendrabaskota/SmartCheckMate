import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSchool, FaSpinner, FaArrowLeft } from "react-icons/fa";

const AddSchool = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const navigate = useNavigate();

  const handleAddSchool = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized! Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://smartcheckmate.onrender.com/api/school/add",
        { name, address },
        { headers: { Authorization: `${token}` } }
      );

      if (
        response.status === 200 &&
        response.data.message === "School created successfully"
      ) {
        navigate("/dashboard");
        return;
      }

      if (
        response.status === 200 &&
        response.data.message === "Payment Required"
      ) {
        const confirmProceed = window.confirm(
          "To add more schools, you need to pay. Do you want to continue to payment?"
        );

        if (!confirmProceed) {
          alert("You cannot add more schools without payment.");
          setLoading(false);
          return;
        }

        const schoolId = response.data.data.schoolId;
        const amount = 200 * 100;

        const paymentResponse = await axios.post(
          "https://smartcheckmate.onrender.com/api/payment",
          { schoolId, amount },
          { headers: { Authorization: `${token}` } }
        );

        if (paymentResponse.data?.payment_url) {
          setPaymentResponse(paymentResponse.data);
          window.location.href = paymentResponse.data.payment_url;
        } else {
          setError("Payment URL is missing in response.");
        }
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong.");
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
              Add New School
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

          {paymentResponse && (
            <div className="mb-6 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded">
              <p className="font-semibold">Payment Required!</p>
              <p className="mt-2">
                <a
                  href={paymentResponse.payment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Click here to complete your payment
                </a>
              </p>
            </div>
          )}

          <form onSubmit={handleAddSchool}>
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
                loading ? "bg-[#10B981]/70" : "bg-[#10B981] hover:bg-[#0e9e6d]"
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Add School"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSchool;
