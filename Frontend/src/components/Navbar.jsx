import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-indigo-500 z-50">
      {/* Top Navbar */}
      <nav className="flex justify-between px-6 items-center py-4">
        <div className="flex space-x-4 items-center">
          <div onClick={() => setIsOpen(true)} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <h1 className="text-white font-bold text-xl tracking-wide cursor-pointer">
            Attendance System
          </h1>
        </div>

        {/* Navbar Buttons */}
        <ul className="flex space-x-6">
          <Link to={'/'}>
          <li className="text-white text-lg font-semibold tracking-normal cursor-pointer">Home</li>
          </Link>
          {isLoggedIn ? (
            <li
              className="text-white text-lg font-semibold tracking-normal cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <>
            <Link to={'/login'}>
              <li className="text-white text-lg font-semibold tracking-normal cursor-pointer">
                Login
              </li>
              </Link>
              <Link to={'/register'}>
              <li className="text-white text-lg font-semibold tracking-normal cursor-pointer">
                Register
              </li>
              </Link>
            </>
          )}
        </ul>
      </nav>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-60 h-full bg-white p-6 shadow-lg">
          <div className="flex space-x-6 mb-6">
            <span onClick={() => setIsOpen(false)} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            <h1>Dashboard</h1>
          </div>
          <ul className="flex flex-col space-y-6 mt-14 border-t py-6">
            <li className="hover:bg-red-500 transition duration-500 cursor-pointer p-2">Home</li>
            <li className="cursor-pointer p-2">Products</li>
            <li className="cursor-pointer p-2">About</li>
            <li className="cursor-pointer p-2">Contact</li>
            {isLoggedIn && <li className="cursor-pointer p-2" onClick={handleLogout}>Logout</li>}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
