import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  // const host = "http://localhost:5000";

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("You have been logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      rtl: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="shadow-md left-0 navbar sticky top-0 bg-gray-100">
      <div className="md:flex main-navbar items-center justify-between bg-gray-100 py-4 md:px-10 px-7">
        <Link
          to="/home"
          className="font-bold text-3xl cursor-pointer flex items-center text-gray-800"
        >
          <img
            src={require(`../../assets/logo.jpg`)}
            alt=""
            className="mx-4 w-12 h-12 text-indigo-900 bg-white-500"
          />
          <span className="text-orange-400 title">FOODLY</span>
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
        >
          <i className={`fa-solid fa-${open ? "xmark" : "bars"}`}></i>
        </div>

        <ul
          className={`md:flex md:items-center md:p-0 p-10 absolute md:static bg-gray-100 md:z-auto z-[-1] left-0 w-full md:w-auto transition-all duration-500 ease-in ${
            open ? "top-12 " : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 text-xl font-semibold md:my-0 my-7">
            <Link
              to="/home"
              className={`text-gray-800 hover:text-orange-400 duration-500`}
            >
              Home
            </Link>
          </li>
          <li className="md:ml-8 text-xl font-semibold md:my-0 my-7">
            <Link
              to="/addRestaurant"
              className={`text-gray-800 hover:text-orange-400 duration-500`}
            >
              Add Restaurant
            </Link>
          </li>
          <li className="md:ml-8 text-xl font-semibold md:my-0 my-7">
            <Link
              to="/findRestaurant"
              className={`text-gray-800 hover:text-orange-400 duration-500`}
            >
              Find Restaurants
            </Link>
          </li>

          {user ? (
            <>
              <span>
                {(() => {
                  if (user?._id === "6607c5e98d927d0ab775d102") {
                    return (
                      <li className="md:ml-8 text-xl font-semibold md:my-0 my-7">
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

              {/* <div className="dropdown relative ml-8 hover:border-blue-500">
                <Link to="/cart">
                  <img
                    src={require(`./../../assets/Devlopers/User.png`)}
                    alt="Default Profile"
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                </Link>
              </div> */}

              <div
                className="dropdown relative ml-8 hover:border-blue-500"
                onClick={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {user && user.profileImage ? (
                  <>
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                    <p>{user.fristname}</p>
                  </>
                ) : (
                  <img
                    src={require(`./../../assets/Devlopers/User.png`)}
                    alt="Default Profile"
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                )}
                <div
                  className="dropdown-menu absolute bg-white rounded-md shadow-md"
                  onClick={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {showDropdown && (
                    <>
                      <li className="dropdown-item px-5 py-2 text-xl font-semibold md:my-0">
                        <Link
                          className={`text-gray-800 hover:text-orange-400 duration-500`}
                          to="/dashboard"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <hr />
                      <li className="dropdown-item px-5 pt-2 pb-3 text-xl font-semibold md:my-0">
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
              <Link
                className="ml-8 text-gray-800 duration-500 border-2 border-orange-400 md:my-0 bg-white-400 rounded-md shadow-md hover:shadow-lg"
                to="/login"
              >
                <button className="text-lg font-semibold md:my-0 my-6 bg-white-400 px-3 py-2">
                  Login
                </button>
              </Link>

              <Link className="text-gray-800 duration-500" to="/signup">
                <button className="md:ml-8 text-lg font-semibold md:my-0 my-7 bg-orange-400 px-3 py-2 rounded-md shadow-md hover:shadow-lg">
                  SignUp
                </button>
              </Link>
            </>
          )}
        </ul>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Navbar;
