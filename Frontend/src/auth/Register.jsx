/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://smartcheckmate.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phoneNumber, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0fdf4] mt-20">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-[#1F2937]">
            Register
          </h2>

          {error && (
            <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
          )}

          <form className="mt-10" onSubmit={handleRegister}>
            {/* Name Field */}
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-[#1F2937] uppercase"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Full Name"
              className="block w-full py-3 px-1 mt-2 text-[#1F2937] appearance-none border-b-2 border-[#10B981] focus:text-[#1F2937] focus:outline-none focus:border-[#0e9e6d]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email Field */}
            <label
              htmlFor="email"
              className="block mt-6 text-sm font-semibold text-[#1F2937] uppercase"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e-mail address"
              autoComplete="email"
              className="block w-full py-3 px-1 mt-2 text-[#1F2937] appearance-none border-b-2 border-[#10B981] focus:text-[#1F2937] focus:outline-none focus:border-[#0e9e6d]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Phone Number Field */}
            <label
              htmlFor="phoneNumber"
              className="block mt-6 text-sm font-semibold text-[#1F2937] uppercase"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="block w-full py-3 px-1 mt-2 text-[#1F2937] appearance-none border-b-2 border-[#10B981] focus:text-[#1F2937] focus:outline-none focus:border-[#0e9e6d]"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

            {/* Password Field */}
            <label
              htmlFor="password"
              className="block mt-6 text-sm font-semibold text-[#1F2937] uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autoComplete="new-password"
              className="block w-full py-3 px-1 mt-2 mb-4 text-[#1F2937] appearance-none border-b-2 border-[#10B981] focus:text-[#1F2937] focus:outline-none focus:border-[#0e9e6d]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-[#10B981] rounded-md font-medium text-white uppercase focus:outline-none hover:bg-[#0e9e6d] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Register
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center items-center justify-center">
              <p className="text-gray-500 text-md mx-4 my-1 sm:my-auto">
                Already have an account?
              </p>
              <Link
                to={"/login"}
                className="text-[#10B981] hover:text-[#0e9e6d] font-medium transition-colors duration-300"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
