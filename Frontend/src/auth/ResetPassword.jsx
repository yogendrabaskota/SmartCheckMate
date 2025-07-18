/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://smartcheckmate.onrender.com/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword , confirmPassword}),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP has been sent to your email.");
        //alert("Password reset successfully!");
        navigate("/login");
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Reset Password</h2>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <form className="mt-10" onSubmit={handleResetPassword}>
            <label className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
            <input
              type="email"
              value={email}
              readOnly
              className="block w-full py-3 px-1 mt-2 text-gray-800 bg-gray-200 border-b-2 border-gray-100 focus:outline-none"
            />

            <label className="block mt-4 text-xs font-semibold text-gray-600 uppercase">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-gray-200"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label className="block mt-4 text-xs font-semibold text-gray-600 uppercase">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-gray-200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
