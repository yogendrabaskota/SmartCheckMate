import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../store/authSlice";
import { STATUSES } from "../globals/misc/statuses";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { forgotPasswordData } = useSelector((state) => state.auth);
  //  console.log("forgetpasswo", forgotPasswordData);
  const data = {
    email: forgotPasswordData.email,
    otp: otp,
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    dispatch(verifyOTP(data));
  };
  useEffect(() => {
    if (forgotPasswordData.status === STATUSES.SUCCESS) {
      alert("OTP verified successfully. You can now reset your password.");
      navigate("/reset-password");
    } else if (forgotPasswordData.status === STATUSES.ERROR) {
      alert("OTP verification failed. Please try again.");
    }
  }, [forgotPasswordData.status, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f0fdf4]">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-[#1F2937]">
            Verify OTP
          </h2>

          {STATUSES.ERROR && (
            <p className="text-red-500 text-center mt-4 font-medium">
              {STATUSES.ERROR}
            </p>
          )}

          <form className="mt-10" onSubmit={handleVerify}>
            <label className="block mt-6 text-sm font-semibold text-[#1F2937] uppercase">
              OTP
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="block w-full py-3 px-1 mt-2 text-[#1F2937] appearance-none border-b-2 border-[#10B981] focus:outline-none focus:border-[#0e9e6d]"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-[#10B981] rounded-md font-medium text-white uppercase focus:outline-none hover:bg-[#0e9e6d] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
