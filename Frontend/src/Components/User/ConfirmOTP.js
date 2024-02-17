import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function Otp() {
  let { Eemail } = useParams();

  const host = "http://localhost:5000";

  const [creditial, setCreditial] = useState({ otp: "" });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const clickHandler = async () => {
    if (Eemail) {
      // Api call
      const response = await fetch(`${host}/api/auth/forgotPassword`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: creditial.email }), // body data type must match "Content-Type" header
      });

      const json = await response.json(); // parses JSON response into native JavaScript objects

      if (json.userid) {
        localStorage.setItem("email", json.email);
        localStorage.setItem("otp", json.otp);
        localStorage.setItem("id", json.userid);
        navigate(`/getotp/${json.email}`);
      } else {
        toast.warning("Attention! Please provide correct email id...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else if (creditial.otp !== "") {
      // Api call
      const response = await fetch(`${host}/api/auth/otpVerification`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          otp: localStorage.getItem("otp"),
        },
        body: JSON.stringify({ otp: creditial.otp }), // body data type must match "Content-Type" header
      });

      const json = await response.json(); // parses JSON response into native JavaScript objects

      if (json.genotp) {
        // localStorage.setItem('token', json.token)
        localStorage.removeItem("otp");
        navigate("/changePassword");
      } else {
        toast.warning("Attention! Please provide correct OTP...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Oops! OTP is no more valid...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onChange = (e) => {
    setCreditial({ ...creditial, [e.target.name]: e.target.value });
  };

  return (
    <section
      className="py-4 bg-gray-100"
      style={{ backgroundColor: "#e7edf4" }}
    >
      <div className="px-5 py-10 flex items-center justify-center">
        <div className="lg:w-3/4 flex rounded-lg bg-white">
          <div className="lg:w-1/2 md:w-1/2 flex flex-col mt-10 md:mt-0">
            <div className="py-8 px-16 mt-14">
              <div className="font-bold text-3xl cursor-pointer flex justify-center font-[Poppins] text-gray-800">
                <span className="text-orange-400">Verification</span>
              </div>

              <form onSubmit={handleSubmit(clickHandler)}>
                <div className="my-4">
                  <label
                    htmlFor="otp"
                    className="leading-7 text-base font-sans"
                  >
                    Enter OTP :<span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={creditial.otp}
                    {...register("otp", {
                      required: "Otp is required",
                      minLength: {
                        value: 6,
                        message: "Otp includes only 6 digits",
                      },
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Invalid otp",
                      },
                      maxLength: {
                        value: 6,
                        message: "Otp includes only 6 digits", //^\d+$
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500">{errors.otp?.message}</p>
                </div>

                <div className="flex justify-center my-6">
                  <button className="w-full text-black font-medium font-[Poppins] bg-gray-100 border-2 border-black-200 py-2 px-6 hover:bg-gray-200 rounded text-lg">
                    <Link>Resend OTP</Link>
                  </button>
                </div>

                <div className="flex justify-center drop-shadow-xl">
                  <button className="w-full text-black font-medium font-[Poppins] bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg">
                    Confirm OTP
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:w-1/2 md:w-1/2 items-center rounded-r-lg bg-teal-200 justify-center flex flex-col mt-10 md:mt-0">
            <img
              alt="ecommerce"
              className="w-4/5 object-cover pt-10 pb-10 pl-10 object-center rounded"
              src="../images/AuthImages/Otp.png"
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
}

export default Otp;
