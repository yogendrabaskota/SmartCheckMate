/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://smartcheckmate.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        window.location.href = "/";
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0fdf4]">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-[#1F2937]">
            Login
          </h2>

          {error && (
            <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
          )}

          <form className="mt-10" onSubmit={handleLogin}>
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
              placeholder="e-mail address"
              autoComplete="email"
              className="block w-full py-3 px-1 mt-2 text-[#1F2937] appearance-none border-b-2 border-[#10B981] focus:text-[#1F2937] focus:outline-none focus:border-[#0e9e6d]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

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
              autoComplete="current-password"
              className="block w-full py-3 px-1 mt-2 mb-4 text-[#1F2937] appearance-none border-b-2 border-[#10B981] focus:text-[#1F2937] focus:outline-none focus:border-[#0e9e6d]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-[#10B981] rounded-md font-medium text-white uppercase focus:outline-none hover:bg-[#0e9e6d] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Login
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center items-center justify-center">
              <Link
                to={"/forgetPassword"}
                className="text-[#10B981] hover:text-[#0e9e6d] font-medium transition-colors duration-300"
              >
                Forgot password?
              </Link>
              <p className="text-gray-500 text-md mx-4 my-1 sm:my-auto">or</p>
              <Link
                to={"/register"}
                className="text-[#10B981] hover:text-[#0e9e6d] font-medium transition-colors duration-300"
              >
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
