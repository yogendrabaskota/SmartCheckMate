/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "https://smartcheckmate.onrender.com/api/forget",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP has been sent to your email.");
        setTimeout(() => navigate("/verify-otp", { state: { email } }), 2000);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0fdf4]">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-[#1F2937]">
            Forgot Password
          </h2>

          {message && (
            <p className="text-green-600 text-center mt-4 font-medium">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
          )}

          <form className="mt-10" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[#1F2937] uppercase"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="block w-full py-3 px-1 mt-2 text-[#1F2937] appearance-none border-b-2 border-[#10B981] focus:text-[#1F2937] focus:outline-none focus:border-[#0e9e6d]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-[#10B981] rounded-md font-medium text-white uppercase focus:outline-none hover:bg-[#0e9e6d] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Submit
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-[#10B981] hover:text-[#0e9e6d] font-medium transition-colors duration-300"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
