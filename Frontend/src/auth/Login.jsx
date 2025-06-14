/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch("https://smartcheckmate.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });


      const data = await response.json();

     // console.log(response.data.data)
      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        //navigate("/"); // Redirect to home
        window.location.href = "/"
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Login</h2>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <form className="mt-10" onSubmit={handleLogin}>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">
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

            <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autoComplete="current-password"
              className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Login
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <Link to={"/forgetPassword"} className="flex-2 underline">
                Forgot password?
              </Link>
              <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">or</p>
              <Link to={"/register"} className="flex-2 underline">
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
