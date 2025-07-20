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
    <header className="fixed top-0 left-0 w-full bg-[#10B981] z-50 shadow-md">
      {/* Top Navbar */}
      <nav className="flex justify-between px-6 items-center py-4">
        <div className="flex space-x-4 items-center">
          <div onClick={() => setIsOpen(true)} className="cursor-pointer">
            <img
              src="../../public/logo.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover border-2 border-white"
            />
          </div>
          <Link to={"/"}>
            <h1 className="text-white font-bold text-xl tracking-wide cursor-pointer">
              𝚂𝚖𝚊𝚛𝚝𝙲𝚑𝚎𝚌𝚔𝙼𝚊𝚝𝚎
            </h1>
          </Link>
        </div>

        {/* Navbar Buttons */}
        <ul className="hidden md:flex space-x-6">
          <Link to={"/"}>
            <li className="text-white text-lg font-semibold tracking-normal cursor-pointer hover:text-[#1F2937] transition duration-300">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="text-white text-lg font-semibold tracking-normal cursor-pointer hover:text-[#1F2937] transition duration-300">
              About
            </li>
          </Link>
          <Link to={"/contact"}>
            <li className="text-white text-lg font-semibold tracking-normal cursor-pointer hover:text-[#1F2937] transition duration-300">
              Contact
            </li>
          </Link>
          {isLoggedIn && (
            <Link to={"/dashboard"}>
              <li className="text-white text-lg font-semibold tracking-normal cursor-pointer hover:text-[#1F2937] transition duration-300">
                Dashboard
              </li>
            </Link>
          )}
          {isLoggedIn ? (
            <li
              className="text-white text-lg font-semibold tracking-normal cursor-pointer hover:text-[#1F2937] transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <>
              <Link to={"/login"}>
                <li className="text-white text-lg font-semibold tracking-normal cursor-pointer hover:text-[#1F2937] transition duration-300">
                  Login
                </li>
              </Link>
              <Link to={"/register"}>
                <li className="text-white text-lg font-semibold tracking-normal cursor-pointer hover:text-[#1F2937] transition duration-300">
                  Register
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white p-6 shadow-lg z-50">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#1F2937] font-bold text-xl">Menu</h1>
            <span
              onClick={() => setIsOpen(false)}
              className="cursor-pointer text-[#1F2937]"
            >
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
          </div>
          <ul className="flex flex-col space-y-4 mt-6">
            <Link to={"/"} onClick={() => setIsOpen(false)}>
              <li className="text-[#1F2937] hover:bg-[#10B981] hover:text-white transition duration-300 cursor-pointer p-3 rounded">
                Home
              </li>
            </Link>
            <Link to={"/about"} onClick={() => setIsOpen(false)}>
              <li className="text-[#1F2937] hover:bg-[#10B981] hover:text-white transition duration-300 cursor-pointer p-3 rounded">
                About
              </li>
            </Link>
            <Link to={"/contact"} onClick={() => setIsOpen(false)}>
              <li className="text-[#1F2937] hover:bg-[#10B981] hover:text-white transition duration-300 cursor-pointer p-3 rounded">
                Contact
              </li>
            </Link>
            {isLoggedIn && (
              <>
                <Link to={"/dashboard"} onClick={() => setIsOpen(false)}>
                  <li className="text-[#1F2937] hover:bg-[#10B981] hover:text-white transition duration-300 cursor-pointer p-3 rounded">
                    Dashboard
                  </li>
                </Link>
                <li
                  className="text-[#1F2937] hover:bg-[#10B981] hover:text-white transition duration-300 cursor-pointer p-3 rounded"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link to={"/login"} onClick={() => setIsOpen(false)}>
                  <li className="text-[#1F2937] hover:bg-[#10B981] hover:text-white transition duration-300 cursor-pointer p-3 rounded">
                    Login
                  </li>
                </Link>
                <Link to={"/register"} onClick={() => setIsOpen(false)}>
                  <li className="text-[#1F2937] hover:bg-[#10B981] hover:text-white transition duration-300 cursor-pointer p-3 rounded">
                    Register
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
