import { Link, useNavigate } from "react-router-dom";
import About from "./About";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <>
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-6 leading-tight">
              Modern Attendance <span className="text-[#10B981]">Tracking</span>{" "}
              Made Simple
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Streamline your attendance management with our intuitive system.
              Perfect for schools, businesses, and organizations of all sizes.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleGetStarted}
                className="bg-[#10B981] hover:bg-[#0e9e6d] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 text-center"
              >
                Get Started
              </button>
              <Link
                to="/about"
                className="bg-white border-2 border-[#10B981] text-[#10B981] hover:bg-[#f0fdf4] font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="bg-[#10B981] bg-opacity-20 rounded-2xl p-8 w-full max-w-md">
              <img
                src="https://illustrations.popsy.co/amber/digital-nomad.svg"
                alt="Attendance System Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#f0fdf4] p-6 rounded-xl shadow-sm">
            <h3 className="text-3xl font-bold text-[#10B981] mb-2">99.9%</h3>
            <p className="text-gray-600">Accuracy Rate</p>
          </div>
          <div className="bg-[#f0fdf4] p-6 rounded-xl shadow-sm">
            <h3 className="text-3xl font-bold text-[#10B981] mb-2">1000+</h3>
            <p className="text-gray-600">Happy Organizations</p>
          </div>
          <div className="bg-[#f0fdf4] p-6 rounded-xl shadow-sm">
            <h3 className="text-3xl font-bold text-[#10B981] mb-2">24/7</h3>
            <p className="text-gray-600">Support Available</p>
          </div>
        </div>
      </section>
      <About />
    </>
  );
};

export default Hero;
