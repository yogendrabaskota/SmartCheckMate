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
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phoneNumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Successfully Registered! ");
        navigate("/login"); // Redirect to login page
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Register</h2>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <form className="mt-10" onSubmit={handleRegister}>
            {/* Name Field */}
            <label htmlFor="name" className="block text-xs font-semibold text-gray-600 uppercase">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Full Name"
              className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email Field */}
            <label htmlFor="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e-mail address"
              autoComplete="email"
              className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Phone Number Field */}
            <label htmlFor="phoneNumber" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

            {/* Password Field */}
            <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autoComplete="new-password"
              className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Register
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">Already have an account?</p>
              <Link to={"/login"} className="flex-2 underline">
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
