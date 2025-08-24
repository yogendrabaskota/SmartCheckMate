/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../store/authSlice";
import { STATUSES } from "../globals/misc/statuses";

const ResetPassword = () => {
  const [userData, setUserData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { forgotPasswordData, status } = useSelector((state) => state.auth);
  //  console.log("forgetpasswo", forgotPasswordData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const newPassword = userData.newPassword;
  const confirmPassword = userData.confirmPassword;
  const data = {
    email: forgotPasswordData.email,
    newPassword,
    confirmPassword,
  };

  console.log("payload data", data);
  const handleResetPassword = async (e) => {
    if (userData.newPassword !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!forgotPasswordData.email) {
      alert("Email is missing from reset request.");
      return;
    }
    e.preventDefault();
    dispatch(resetPassword(data));
  };

  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      alert("Reset Password successfully");
      navigate("/login");
    } else if (status === STATUSES.ERROR) {
      alert("something went wrong");
    }
  }, [status, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f0fdf4]">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-[#1F2937]">
            Reset Password
          </h2>

          {status === STATUSES.ERROR && (
            <p className="text-red-500 text-center mt-4 font-medium">
              Something Went wrongg
            </p>
          )}

          <form className="mt-10" onSubmit={handleResetPassword}>
            <label className="block mt-6 text-sm font-semibold text-[#1F2937] uppercase">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              className="block w-full py-3 px-1 mt-2 text-[#1F2937] appearance-none border-b-2 border-[#10B981] focus:outline-none focus:border-[#0e9e6d]"
              value={userData.newPassword}
              onChange={handleChange}
              required
            />

            <label className="block mt-6 text-sm font-semibold text-[#1F2937] uppercase">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              className="block w-full py-3 px-1 mt-2 text-[#1F2937] appearance-none border-b-2 border-[#10B981] focus:outline-none focus:border-[#0e9e6d]"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-[#10B981] rounded-md font-medium text-white uppercase focus:outline-none hover:bg-[#0e9e6d] transition-colors duration-300 shadow-md hover:shadow-lg"
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
