import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import "./Common.css";

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
    if (creditial.otp !== "") {
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
          autoClose: 3000,
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
        autoClose: 3000,
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

  const resendOTP = async () => {
    if (Eemail !== "") {
      // Api call
      const response = await fetch(`${host}/api/auth/forgotPassword`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Eemail }), // body data type must match "Content-Type" header
      });

      const json = await response.json(); // parses JSON response into native JavaScript objects

      if (json.userid) {
        localStorage.setItem("email", json.email);
        localStorage.setItem("otp", json.otp);
        localStorage.setItem("id", json.userid);
        toast.success("OTP has been sent to your email address.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.warning("Attention! Please provide correct email id...", {
          position: "top-right",
          autoClose: 3000,
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
      console.log("Incorrect email");
    }
  };

  const onChange = (e) => {
    setCreditial({ ...creditial, [e.target.name]: e.target.value });
  };

  return (
    <section className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-content slide-left">
          <div className="py-6 px-16">
            <div id="title">Verification</div>
            <form onSubmit={handleSubmit(clickHandler)}>
              <div className="my-1">
                <label htmlFor="otp" className="label-text">
                  Enter OTP :<span className="text-red-600 text-lg"> *</span>
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  className="input-field"
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
                <p className="text-sm text-red-500 absolute">
                  {errors.otp?.message}
                </p>
              </div>

              <div className="flex justify-center drop-shadow-xl mt-10">
                <button className="w-full text-black font-medium font-[Poppins] bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg">
                  Confirm OTP
                </button>
              </div>
            </form>

            <div className="flex justify-center mt-10 mb-8">
              <button
                className="w-full text-black font-medium font-[Poppins] bg-gray-200 border-2 border-black-200 py-2 px-6 hover:bg-gray-300 rounded text-lg"
                onClick={resendOTP}
              >
                <Link>Resend OTP</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="forgot-img slide-right">
          <img
            alt="ecommerce"
            className="side-img"
            src="../images/AuthImages/Otp.png"
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
