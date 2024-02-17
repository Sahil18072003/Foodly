import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const host = "http://localhost:5000";

  const [creditial, setCreditial] = useState({
    // username: "",
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

  const clickHandler = async (e) => {
    if (
      // creditial.username !== "" &&
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
          // username: creditial.username,
          email: creditial.email,
          phone: creditial.phone,
          password: creditial.password,
        }), // body data type must match "Content-Type" header
      });

      const json = await response.json(); // parses JSON response into native JavaScript objects

      if (json.token) {
        localStorage.setItem("token", json.token);
        navigate("/home");
      } else {
        toast.error("Your email has been already used...", {
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
      console.log("If not");
      toast.error("Please fill all the required field...", {
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
    <section className="bg-gray-100" style={{ backgroundColor: "#e7edf4" }}>
      <div className="px-5 py-8 flex items-center justify-center h-100%">
        <div className="lg:w-3/4 flex rounded-lg bg-white">
          <div className="lg:w-1/2 md:w-1/2 items-center rounded-l-lg bg-teal-200 justify-center flex flex-col">
            <img
              alt="ecommerce"
              className="w-full object-cover object-center hidden sm:block"
              src="../images/AuthImages/Signup.png"
            />
          </div>
          
          <div className="lg:w-1/2 md:w-1/2 flex flex-col mt-10 md:mt-0">
            <div className="py-8 px-16">
              <div className="font-bold text-3xl cursor-pointer flex justify-center font-[Poppins] text-gray-800">
                <span className="text-orange-400">Create Your Account</span>
              </div>

              <div className="w-full my-7 text-lg flex items-center justify-center">
                <GoogleOAuthProvider clientId="218028871541-fr431cpfp05060mborg1m4209vvttdg6.apps.googleusercontent.com">
                  <div className="text-lg flex justify-center border-none border-0">
                    <GoogleLogin
                      onSuccess={async (credentialResponse) => {
                        const decode = jwt_decode(
                          credentialResponse.credential
                        );

                        let name = decode.name;
                        let gmail = decode.email;

                        let data = await fetch(
                          "http://localhost:5000/google-check",
                          {
                            method: "post",
                            body: JSON.stringify({
                              username: name,
                              email: gmail,
                            }),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );

                        // console.log("result :", data);
                        data = await data.json();
                        if (!data) {
                          data = await fetch(
                            "http://localhost:5000/google-login",
                            {
                              method: "post",
                              body: JSON.stringify({
                                username: name,
                                email: gmail,
                                image: "avtar.png",
                              }),
                              headers: {
                                "Content-Type": "application/json",
                              },
                            }
                          );

                          data = await data.json();
                        }

                        // console.log(data);
                        if (data.token) {
                          localStorage.setItem(
                            "user",
                            JSON.stringify(data.result)
                          );
                          localStorage.setItem(
                            "token",
                            JSON.stringify(data.token)
                          );
                          navigate("/home");
                        }
                      }}
                      onError={() => {
                        console.log("Login Failed");
                        toast.error("Something went wrong...", {
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
                      }}
                    />
                  </div>
                </GoogleOAuthProvider>
              </div>

              <p className="my-2 flex align-middle items-center justify-between">
                <span className="w-2/5 border-b-2 border-gray-200"></span>
                OR
                <span className="w-2/5 border-b-2 border-gray-200"></span>
              </p>

              <form onSubmit={handleSubmit(clickHandler)}>
                {/* <div className="my-3">
                <label
                  htmlFor="username"
                  className="leading-7 text-base font-sans justify-right"
                >
                  Username :<span className="text-red-600 text-lg"> *</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={creditial.username}
                  {...register("username", {
                    required: "Username is required",
                  })}
                  onChange={onChange}
                  autoComplete="false"
                />
                <p className="text-sm text-red-500">
                  {errors.username?.message}
                </p>
              </div> */}
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="leading-6 text-base font-sans "
                  >
                    Email Address :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={creditial.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "Email is not valid",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="phone"
                    className="leading-6 text-base font-sans "
                  >
                    Phone Number :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={creditial.phone}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[6-9]{1}[0-9]{9}$/,
                        message: "Phone number is not valid",
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone no. cannot exceed more than 10 digits",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500">
                    {errors.phone?.message}
                  </p>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="leading-6 text-base font-sans"
                  >
                    Password :<span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={creditial.password}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be more than 4 characters",
                      },
                      maxLength: {
                        value: 10,
                        message:
                          "Password cannot exceed more than 10 characters",
                      },
                    })}
                    onChange={onChange}
                  />
                  <p className="text-sm text-red-500">
                    {errors.password?.message}
                  </p>
                </div>
                <div className="flex justify-center drop-shadow-xl">
                  <button className="w-full text-black font-medium font-[Poppins] bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg">
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

export default Signup;
