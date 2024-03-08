import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Common.css";

function ForgotPassword() {
  const host = "http://localhost:5000";

  const [creditial, setCreditial] = useState({ email: "" });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "ForgotPasswrd | Foodly";
  }, []);

  const clickHandler = async (e) => {
    if (creditial.email !== "") {
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

        toast.success("OTP has been sent to your email address.", {
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
        setTimeout(() => {
          navigate(`/getotp/${json.email}`);
        }, 4000);
      } else {
        toast.warning("Attention! Please provide correct email id...", {
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
        <div className="forgot-img-right slide-right">
          <img
            alt="ecommerce"
            className="side-img-left"
            src="../images/AuthImages/Forgot.png"
          />
        </div>
        <div className="forgot-content slide-left">
          <div className="py-8 px-16">
            <div id="title">Forgot Password ?</div>
            <form onSubmit={handleSubmit(clickHandler)}>
              <div className="my-4">
                <label htmlFor="email" className="label-text">
                  Email address :
                  <span className="text-red-600 text-lg"> *</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  value={creditial.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g,
                      message: "Email is not valid email",
                    },
                  })}
                  onChange={onChange}
                  autoComplete="false"
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.email?.message}
                </p>
              </div>

              <div className="my-12 flex justify-center drop-shadow-xl">
                <button className="w-full text-black font-medium font-[Poppins] bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg">
                  Get OTP
                </button>
              </div>
            </form>
          </div>
        </div>
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
    </section>
  );
}

export default ForgotPassword;
