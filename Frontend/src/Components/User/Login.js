import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import "./Common.css";

const Login = () => {
  const host = "http://localhost:5000";

  const [creditial, setCreditial] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Login | Foodly";
  }, []);

  const clickHandler = async (e) => {
    if (creditial.email !== "" && creditial.password !== "") {
      // Api call
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: creditial.email,
          password: creditial.password,
        }), // body data type must match "Content-Type" header
      });

      // parses JSON response into native JavaScript objects
      const json = await response.json();
      console.log(json);

      if (json.token) {
        localStorage.setItem("token", json.token);
        localStorage.setItem("user", JSON.stringify(json.userId));

        toast.success("You are successfully login with your email.", {
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
          navigate("/");
        }, 4000);
      } else {
        toast.warning("Attention! Please provide correct information...", {
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
      toast.warning("Please fill all the field...", {
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
  };

  const onChange = (e) => {
    setCreditial({ ...creditial, [e.target.name]: e.target.value });
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-content slide-left">
          <div className="py-8 px-16">
            <div id="title">Login Into Your Account</div>
            <div className="w-full my-4 text-lg flex items-center justify-center">
              <GoogleOAuthProvider clientId="218028871541-fr431cpfp05060mborg1m4209vvttdg6.apps.googleusercontent.com">
                <div className="w-full border-black-100 mx-auto text-lg flex justify-center">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      const decode = jwt_decode(credentialResponse.credential);

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
                        autoClose: 2000,
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

            <p className="flex align-middle items-center justify-between">
              <span className="w-2/5 border-b-2 border-gray-200"></span>
              OR
              <span className="w-2/5 border-b-2 border-gray-200"></span>
            </p>

            <form onSubmit={handleSubmit(clickHandler)}>
              <div className="my-3">
                <label htmlFor="email" className="label-text">
                  Email Address:
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
                      message: "Max 4 characters for Password",
                    },
                  })}
                  onChange={onChange}
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.password?.message}
                </p>
              </div>

              <div className="py-4 flex justify-center">
                <Link to="/forgotpassword">
                  <p className="text-blue-700 hover:text-blue-800 font-normal cursor-pointer">
                    Forgot Password ?
                  </p>
                </Link>
              </div>

              <div className="flex justify-center drop-shadow-xl">
                <button className="w-full text-black font-medium btn-txt bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg">
                  Login
                </button>
              </div>
            </form>

            <p className="mt-4 items-center flex justify-center">
              {" "}
              Don't have account ?{" "}
              <Link className="text-indigo-500 px-2" to={"/signup"}>
                Register here
              </Link>
            </p>

            <p className="mt-3 items-center flex justify-center">
              <Link className="text-indigo-500 px-3" to={"/home"}>
                Back to Home
              </Link>
            </p>
          </div>
        </div>
        <div className="login-img slide-right">
          <img
            alt="ecommerce"
            className="side-img-right"
            src="../images/AuthImages/Login.png"
          />
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
};

export default Login;
