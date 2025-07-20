/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#10B981] z-50 shadow-lg">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer md:hidden"
          >
            <img
              src="/logo.jpg" // Changed to public directory path
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
          </div>
          <Link to={"/"} className="flex items-center space-x-3">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="hidden md:block h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <h1 className="text-white font-bold text-2xl tracking-tight font-sans">
              <span className="font-extrabold">Smart</span>
              <span className="font-light">CheckMate</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          <NavItem to="/" text="Home" />
          <NavItem to="/about" text="About" />
          <NavItem to="/contact" text="Contact" />

          {isLoggedIn ? (
            <>
              <NavItem to="/dashboard" text="Dashboard" />
              <button
                onClick={handleLogout}
                className="text-white text-lg font-medium hover:text-[#1F2937] transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" text="Login" />
              <Link
                to="/register"
                className="bg-white text-[#10B981] font-medium px-4 py-2 rounded-lg hover:bg-white/90 transition-colors duration-200 shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed top-0 left-0 w-4/5 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h1 className="text-2xl font-bold text-[#1F2937]">Menu</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-[#10B981]"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="p-4 space-y-2">
              <MobileNavItem
                to="/"
                text="Home"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavItem
                to="/about"
                text="About"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavItem
                to="/contact"
                text="Contact"
                onClick={() => setIsOpen(false)}
              />

              {isLoggedIn ? (
                <>
                  <MobileNavItem
                    to="/dashboard"
                    text="Dashboard"
                    onClick={() => setIsOpen(false)}
                  />
                  <li
                    className="text-[#1F2937] hover:bg-[#10B981] hover:text-white px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <MobileNavItem
                    to="/login"
                    text="Login"
                    onClick={() => setIsOpen(false)}
                  />
                  <MobileNavItem
                    to="/register"
                    text="Register"
                    onClick={() => setIsOpen(false)}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

// Reusable NavItem component for desktop
const NavItem = ({ to, text }) => (
  <li>
    <Link
      to={to}
      className="text-white text-lg font-medium hover:text-[#1F2937] transition-colors duration-200 relative group"
    >
      {text}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  </li>
);

// Reusable MobileNavItem component
const MobileNavItem = ({ to, text, onClick }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="block text-[#1F2937] hover:bg-[#10B981] hover:text-white px-4 py-3 rounded-lg transition-colors duration-200"
    >
      {text}
    </Link>
  </li>
);

export default Navbar;
