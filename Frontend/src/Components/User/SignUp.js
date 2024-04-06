import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Common.css";

function Signup() {
  const host = "http://localhost:5000";

  const [creditial, setCreditial] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "SignUp | Foodly";
  }, []);

  const clickHandler = async (e) => {
    if (
      creditial.email !== "" &&
      creditial.phone !== "" &&
      creditial.password !== ""
    ) {
      // Api call
      const response = await fetch(`${host}/api/auth/signup`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: creditial.username,
          email: creditial.email,
          phone: creditial.phone,
          password: creditial.password,
          profileImage: creditial.profileImage,
        }), // body data type must match "Content-Type" header
      });

      // parses JSON response into native JavaScript objects
      const json = await response?.json();

      if (json.token) {
        toast.success("You are successfully signup with your email.", {
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
          navigate("/login");
        }, 2000);
      } else {
        toast.error(
          "Your email has been already used...sign up with another email.",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            rtl: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    } else {
      toast.error("Please fill all the required field...", {
        position: "top-right",
        autoClose: 1500,
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

  const google = () => {
    window.open(`${host}/auth/google`, "_self");
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-img-left slide-right">
          <img
            alt="ecommerce"
            className="side-img-left"
            src="../images/AuthImages/Signup.png"
          />
        </div>
        <div className="login-content slide-left">
          <div className="py-6 px-16">
            <div id="title">Create Your Account</div>
            <button type="button" className="google-auth" onClick={google}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.611 20.083H42V20H24V28H35.303C33.654 32.657 29.223 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24C4 35.045 12.955 44 24 44C35.045 44 44 35.045 44 24C44 22.659 43.862 21.35 43.611 20.083Z"
                  fill="#FFC107"
                />
                <path
                  d="M6.306 14.691L12.877 19.51C14.655 15.108 18.961 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691Z"
                  fill="#FF3D00"
                />
                <path
                  d="M24 44C29.166 44 33.86 42.023 37.409 38.808L31.219 33.57C29.1436 35.1484 26.6075 36.0021 24 36C18.798 36 14.381 32.683 12.717 28.054L6.19501 33.079C9.50501 39.556 16.227 44 24 44Z"
                  fill="#4CAF50"
                />
                <path
                  d="M43.611 20.083H42V20H24V28H35.303C34.5142 30.2164 33.0934 32.1532 31.216 33.571L31.219 33.569L37.409 38.807C36.971 39.205 44 34 44 24C44 22.659 43.862 21.35 43.611 20.083Z"
                  fill="#1976D2"
                />
              </svg>
              Continue with Google
            </button>

            <p className="flex align-middle items-center justify-between">
              <span className="w-2/5 border-b-2 border-gray-200"></span>
              OR
              <span className="w-2/5 border-b-2 border-gray-200"></span>
            </p>

            <form onSubmit={handleSubmit(clickHandler)}>
              <div className="mb-3">
                <label htmlFor="email" className="label-text">
                  Email Address :
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
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                      message: "Email is not valid",
                    },
                  })}
                  onChange={onChange}
                  autoComplete="false"
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.email?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="label-text">
                  Contact Number :
                  <span className="text-red-600 text-lg"> *</span>
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  className="input-field"
                  value={creditial.phone}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[6-9]{1}[0-9]{9}$/,
                      message: "Phone number is not valid",
                    },
                    maxLength: {
                      value: 10,
                      message: "Max 10 characters for Phone number",
                    },
                  })}
                  onChange={onChange}
                  autoComplete="false"
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.phone?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="label-text">
                  Password :<span className="text-red-600 text-lg"> *</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input-field"
                  value={creditial.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Min 4 characters for Password",
                    },
                    maxLength: {
                      value: 10,
                      message: "Max 10 characters for Password",
                    },
                  })}
                  onChange={onChange}
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.password?.message}
                </p>
              </div>
              <div className="mt-9 flex justify-center drop-shadow-xl">
                <button className="w-full text-black font-medium btn-txt bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg">
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-4 items-center flex justify-center">
              Already register ?{" "}
              <Link className="text-indigo-500 px-3" to={"/login"}>
                Login here
              </Link>
            </p>

            <p className="mt-3 items-center flex justify-center">
              <Link className="text-indigo-500 px-3" to={"/home"}>
                Back to Home
              </Link>
            </p>
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

export default Signup;
