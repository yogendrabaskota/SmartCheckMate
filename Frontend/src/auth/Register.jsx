import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, setStatus } from "../store/authSlice";
import { STATUSES } from "../globals/misc/statuses";

const Register = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };
  useEffect(() => {
    if (status == STATUSES.SUCCESS) {
      console.log("here");
      navigate("/login");
      dispatch(setStatus(STATUSES.IDLE));
    } else if (status == STATUSES.ERROR) {
      alert("Registration failed. Please try again.");
    }
  }, [status, navigate, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f0fdf4] mt-20">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-[#1F2937]">
            Register
          </h2>

          {status === STATUSES.ERROR && (
            <p className="text-red-500 text-center mt-4 font-medium">
              Something went wrong
            </p>
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
              // value={name}
              onChange={handleChange}
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
              // value={email}
              onChange={handleChange}
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
              // value={phoneNumber}
              onChange={handleChange}
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
              // value={password}
              onChange={handleChange}
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
