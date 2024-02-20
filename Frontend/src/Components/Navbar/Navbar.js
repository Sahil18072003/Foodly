import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="shadow-md w-full top-0 left-0 z-50 sticky">
      <div className="md:flex items-center justify-between bg-gray-200 py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center
        text-gray-800"
        >
          <span className="text-orange-400 title">FOODLY</span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
        >
          <i className={`fa-solid fa-${open ? "xmark" : "bars"}`}></i>
        </div>

        <ul
          className={`md:flex bg-gray-200 md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in  ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 text-xl font-semibold md:my-0 my-7 bg-gray-200">
            <Link
              to="/home"
              className={`text-gray-800 hover:text-orange-400 duration-500`}
            >
              Home
            </Link>
          </li>
          <li className="md:ml-8 text-xl font-semibold md:my-0 my-7 bg-gray-200">
            <Link
              to="/addrestaurant"
              className={`text-gray-800 hover:text-orange-400 duration-500`}
            >
              Add Restaurant
            </Link>
          </li>
          <li className="md:ml-8 text-xl font-semibold md:my-0 my-7 bg-gray-200">
            <Link
              to="/findrestaurant"
              className={`text-gray-800 hover:text-orange-400 duration-500`}
            >
              Find Restaurants
            </Link>
          </li>

          {user ? (
            <>
              <span>
                {" "}
                {(() => {
                  if (user === "65d326b322e19d815a45ac3d") {
                    return (
                      <li className="md:ml-8 text-xl font-semibold md:my-0 my-7 bg-gray-200">
                        <Link
                          className={`text-gray-800 hover:text-orange-400 duration-500`}
                          to="/adminPage"
                        >
                          Admin
                        </Link>
                      </li>
                    );
                  }
                })()}
              </span>

              <div
                className="dropdown relative ml-8 mr-16 hover:border-blue-500"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={require(`../../assets/Devlopers/User.png`)}
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <div
                  className="dropdown-menu absolute bg-white rounded-md shadow-md"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {showDropdown && (
                    <>
                      <li className="dropdown-item px-5 py-2 text-xl font-semibold md:my-0 bg-gray-200">
                        <Link
                          className={`text-gray-800 hover:text-orange-400 duration-500`}
                          to="/profile"
                        >
                          Profile
                        </Link>
                      </li>
                      <hr />
                      <li className="dropdown-item px-5 py-2 text-xl font-semibold md:my-0 bg-gray-200">
                        <Link
                          className={`text-gray-800 hover:text-orange-400 duration-500`}
                          onClick={handleLogout}
                          to="/login"
                        >
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <li className="md:ml-8 text-xl font-semibold md:my-0 my-7 bg-gray-200">
                <Link
                  className={`text-gray-800 hover:text-orange-400 duration-500`}
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="md:ml-8 text-xl font-semibold md:my-0 my-7 bg-gray-200">
                <Link
                  className={`text-gray-800 hover:text-orange-400 duration-500`}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
