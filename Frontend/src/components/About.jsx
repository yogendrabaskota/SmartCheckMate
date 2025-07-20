import { Link } from "react-router-dom";
import {
  FaSchool,
  FaUsers,
  FaClipboardCheck,
  FaChartLine,
  FaMobileAlt,
  FaShieldAlt,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-[#e0f7fa] py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-12">
          <div className="md:flex h-full">
            {/* Text Content */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4 leading-tight">
                SmartCheckMate{" "}
                <span className="text-[#10B981]">Attendance System</span>
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-6">
                Revolutionizing classroom management with our intuitive,
                cloud-based attendance tracking solution designed specifically
                for educators.
              </p>
              <div>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center bg-[#10B981] hover:bg-[#0e9e6d] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started Now
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Image Section - No Outer Spacing */}
            <div className="hidden md:block md:w-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
                alt="Teacher taking attendance"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-2 text-center">
            Powerful Features for{" "}
            <span className="text-[#10B981]">Educators</span>
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Designed to save time and reduce administrative workload while
            providing valuable insights.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#f8fafc] p-6 rounded-lg border border-[#10B981]/20 hover:border-[#10B981]/50 transition-all duration-300">
              <div className="text-[#10B981] text-4xl mb-4">
                <FaSchool />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                School Management
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Create and manage multiple schools</li>
                <li>Detailed school profiles</li>
                <li>Role-based access control</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#f8fafc] p-6 rounded-lg border border-[#10B981]/20 hover:border-[#10B981]/50 transition-all duration-300">
              <div className="text-[#10B981] text-4xl mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                Class & Student Management
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Create unlimited classes per school</li>
                <li>Bulk student registration</li>
                <li>Auto-generated roll numbers</li>
                <li>Student performance tracking</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#f8fafc] p-6 rounded-lg border border-[#10B981]/20 hover:border-[#10B981]/50 transition-all duration-300">
              <div className="text-[#10B981] text-4xl mb-4">
                <FaClipboardCheck />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                Attendance Tracking
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>One-click daily attendance</li>
                <li>Present/Absent records</li>
                <li>Daily, weekly, monthly views</li>
                <li>Attendance pattern analysis</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#f8fafc] p-6 rounded-lg border border-[#10B981]/20 hover:border-[#10B981]/50 transition-all duration-300">
              <div className="text-[#10B981] text-4xl mb-4">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                Reporting & Analytics
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Real-time attendance reports</li>
                <li>Export to Excel/PDF</li>
                <li>Student attendance history</li>
                <li>Class performance metrics</li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#f8fafc] p-6 rounded-lg border border-[#10B981]/20 hover:border-[#10B981]/50 transition-all duration-300">
              <div className="text-[#10B981] text-4xl mb-4">
                <FaMobileAlt />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                Mobile Friendly
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Responsive design works on any device</li>
                <li>Offline mode available</li>
                <li>Quick access dashboard</li>
                <li>Push notifications</li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="bg-[#f8fafc] p-6 rounded-lg border border-[#10B981]/20 hover:border-[#10B981]/50 transition-all duration-300">
              <div className="text-[#10B981] text-4xl mb-4">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                Security & Privacy
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>End-to-end data encryption</li>
                <li>Regular automated backups</li>
                <li>GDPR compliant</li>
                <li>Role-based permissions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-8 text-center">
            Why Choose <span className="text-[#10B981]">SmartCheckMate</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-[#10B981]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-[#10B981]">⏱️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600">
                Reduce administrative work by up to 70% with our streamlined
                attendance process.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-[#10B981]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-[#10B981]">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Data-Driven Insights
              </h3>
              <p className="text-gray-600">
                Get actionable insights into student attendance patterns and
                trends.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-[#10B981]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-[#10B981]">🌐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cloud-Based</h3>
              <p className="text-gray-600">
                Access your data securely from anywhere, anytime, on any device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
