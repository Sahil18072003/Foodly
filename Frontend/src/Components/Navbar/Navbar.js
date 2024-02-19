import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  let [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="shadow-md w-full top-0 left-0 z-50 sticky">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
        text-gray-800"
        >
          <span className="text-orange-400">FOODLY</span>
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
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link
              to="/home"
              className={`text-gray-800 hover:text-orange-400 duration-500 `}
            >
              Home
            </Link>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link
              to="/aboutus"
              className={`text-gray-800 hover:text-gray-400 duration-500`}
            >
              About
            </Link>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link
              to="/contactus"
              className={`text-gray-800 hover:text-gray-400 duration-500`}
            >
              Contact
            </Link>
          </li>

          {!localStorage.getItem("token") ? (
            <form>
              {/* <li className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to="/signup"
                  className={`text-gray-800  hover:text-gray-400 duration-500`}
                >
                  Signup
                </Link>
              </li> */}
              <li className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  <i className="fa-solid fa-user pr-3"></i>login
                </Link>
              </li>
            </form>
          ) : (
            <button
              className="text-gray-800 hover:text-gray-400 text-xl pl-5 duration-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
