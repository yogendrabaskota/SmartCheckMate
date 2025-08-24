/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../store/authSlice";
import { STATUSES } from "../globals/misc/statuses";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgetPassword({ email }));
  };
  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      alert("Password OTP sent to your email");
      navigate("/verify-otp");
    } else if (status === STATUSES.ERROR) {
      alert("Failed to send password reset link. Please try again.");
    }
  }, [status, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f0fdf4] mt-10">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-[#1F2937]">
            Forgot Password
          </h2>

          {STATUSES.ERROR && (
            <p className="text-red-500 text-center mt-4 font-medium">
              {STATUSES.ERROR}
            </p>
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
