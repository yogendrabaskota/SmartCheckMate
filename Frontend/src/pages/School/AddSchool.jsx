/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        "http://localhost:5000/api/school/add",
        { name, address },
        { headers: { Authorization: `${token}` } }
      );

      if (response.status === 200 && response.data.message === "School created successfully") {
        alert("School added successfully!");
        navigate("/");
        return;
      }

      // Ask user if they want to add another school 
      if (response.status === 200 && response.data.message === "Payment Required") {
        const confirmProceed = window.confirm(
          "To to add more schools, you ahve to pay. Do you want to continue to payment?"
        );

        if (!confirmProceed) {
          alert("You can not add more schools without payment.");
          setLoading(false);
          return;
        }

        const schoolId = response.data.data.schoolId;
        const amount = 200 * 100;

        const paymentResponse = await axios.post(
          "http://localhost:5000/api/payment",
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800">
          Add School
        </h2>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {paymentResponse && (
          <div className="mt-4 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
            <p>Payment Required!</p>
            <p>
              <strong>Payment URL:</strong>{" "}
              <a
                href={paymentResponse.payment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Click here to pay
              </a>
            </p>
          </div>
        )}

        <form className="mt-6" onSubmit={handleAddSchool}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            School Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter school name"
            className="block w-full p-3 mt-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="address" className="block mt-4 text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter school address"
            className="block w-full p-3 mt-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gray-800 text-white rounded-md font-medium text-lg hover:bg-gray-700 transition disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchool;
