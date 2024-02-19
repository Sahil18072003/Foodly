import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Common.css";

function ConfirmPassword() {
  const host = "http://localhost:5000";
  const [creditial, setCreditial] = useState({ password: "", cpassword: "" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const clickHandler = async (e) => {
    if (creditial.password !== "" && creditial.cpassword !== "") {
      if (creditial.password === creditial.cpassword) {
        // Api call
        const response = await fetch(`${host}/api/auth/changePassword`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            id: localStorage.getItem("id"),
          },
          body: JSON.stringify({
            password: creditial.password,
            cpassword: creditial.cpassword,
          }), // body data type must match "Content-Type" header
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects

        if (json) {
          // localStorage.setItem('token', json.token)
          // localStorage.removeItem("id");
          localStorage.clear();
          toast.success(
            "Password change successfully. You may proceed for login...",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              rtl: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          toast.error("Oops! Changing password is failed...", {
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
        toast.warning("Attention! Password didn't match...", {
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
      toast.error("Error: Password must be filled...", {
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

  const onChange = (e) => {
    setCreditial({ ...creditial, [e.target.name]: e.target.value });
  };

  return (
    <section className="forgot-page">
      <div className="forgot-card">
        <div className="login-img-left slide-right">
          <img
            alt="ecommerce"
            className="side-img-left"
            src="../images/AuthImages/Reset.png"
          />
        </div>
        <div className="login-content slide-left">
          <div className="py-8 px-16">
            <div id="title">Reset Password</div>
            <form onSubmit={handleSubmit(clickHandler)}>
              <div className="my-4">
                <label htmlFor="password" className="label-text">
                  New Password :<span className="text-red-600 text-lg"> *</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input-field"
                  value={creditial.password}
                  {...register("password", {
                    required: "New Password is required",
                    minLength: {
                      value: 4,
                      message: "Min 4 characters for New password",
                    },
                    maxLength: {
                      value: 10,
                      message:
                        "Max 10 characters for New password",
                    },
                  })}
                  onChange={onChange}
                  autoComplete="false"
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.password?.message}
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="cpassword" className="label-text">
                  Confirm Password :
                  <span className="  text-red-600 text-lg"> *</span>
                </label>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  className="input-field"
                  value={creditial.cpassword}
                  {...register("cpassword", {
                    required: "Confirm Password is required",
                    minLength: {
                      value: 4,
                      message:
                        "Min 4 characters for Confirm password",
                    },
                    maxLength: {
                      value: 10,
                      message:
                        "Max 10 characters for Confirm password",
                    },
                  })}
                  onChange={onChange}
                  autoComplete="false"
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.cpassword?.message}
                </p>
              </div>

              <div className="flex justify-center drop-shadow-xl mt-10">
                <button className="w-full text-black font-medium font-[Poppins] bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg">
                  Update Password
                </button>
              </div>
            </form>
          </div>
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

export default ConfirmPassword;
