import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Y", {
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
    <div className="shadow-md w-full top-0 left-0 sticky">
      <div className="md:flex items-center justify-between bg-white py-3 md:px-10 px-7">
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
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 text-lg font-semibold md:my-0 my-7">
            <Link
              to="/home"
              className={`text-gray-800 hover:text-orange-400 duration-500`}
            >
              Home
            </Link>
          </li>
          <li className="md:ml-8 text-lg font-semibold md:my-0 my-7">
            <Link
              to="/addrestaurant"
              className={`text-gray-800 hover:text-orange-400 duration-500`}
            >
              Add Restaurant
            </Link>
          </li>
          <li className="md:ml-8 text-lg font-semibold md:my-0 my-7">
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
                  if (user?.userId === "65d326b322e19d815a45ac3d") {
                    return (
                      <li className="md:ml-8 text-lg font-semibold md:my-0 my-7">
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
                onClick={handleMouseEnter}
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
                  onClick={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {showDropdown && (
                    <>
                      <li className="dropdown-item px-5 py-2 text-lg font-semibold md:my-0">
                        <Link
                          className={`text-gray-800 hover:text-orange-400 duration-500`}
                          to="/dashboard"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <hr />
                      <li className="dropdown-item px-5 py-2 text-lg font-semibold md:my-0">
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
              <li className="md:ml-8 text-md font-semibold md:my-0 my-7 bg-white-400 border-2 border-orange-400 px-3 py-2 rounded-md shadow-md hover:shadow-lg">
                <Link className={`text-gray-800 duration-500`} to="/login">
                  Login
                </Link>
              </li>
              <li className="md:ml-8 text-md font-semibold md:my-0 my-7 bg-orange-400 px-3 py-2 rounded-md shadow-md hover:shadow-lg">
                <Link className={`text-gray-800 duration-500`} to="/signup">
                  SignUp
                </Link>
              </li>
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
