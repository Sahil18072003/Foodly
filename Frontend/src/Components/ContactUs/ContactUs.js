import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactUs.css";

const ContactUs = () => {
  const host = "http://localhost:5000";

  let user = JSON.parse(localStorage.getItem("user"));

  const [creditial, setCreditial] = useState({
    username: "",
    email: user?.email,
    phone: user?.phone,
    message: "",
  });

  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "ContactUs | Foodly";
  }, []);

  const clickHandler = async (e) => {
    if (
      creditial.username !== "" &&
      creditial.email !== "" &&
      creditial.phone !== "" &&
      creditial.message !== ""
    ) {
      // Api call
      const response = await fetch(`${host}/api/auth/contactUs`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: creditial.username,
          email: creditial.email,
          phone: creditial.phone,
          message: creditial.message,
        }), // body data type must match "Content-Type" header
      });

      // parses JSON response into native JavaScript objects
      const json = await response.json();

      if (json.token) {
        toast.success("Your Message sent successfully!!", {
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
      } else {
        toast.error("Error in sending message", {
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
      toast.error("Please fill all the required field..", {
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
    <div className="antialiased bg-white-100 mx-5">
      <div className="flex w-full min-h-screen justify-center items-center">
        <div
          className="mt-10 mb-20 flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-teal-500 w-full max-w-4xl p-8 
                    md:p-12 rounded-xl shadow-lg text-white overflow-hidden"
        >
          <div className="flex flex-col space-y-8 justify-between">
            <div>
              <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
              <p className="pt-2 text-cyan-100 text-lg">
                We would love to hear from you!
              </p>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="inline-flex space-x-2 items-center">
                <ion-icon
                  name="call"
                  className="text-teal-300 text-xl"
                ></ion-icon>
                <span>Contact No.: +91 63535 49828</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
                <ion-icon
                  name="mail"
                  className="text-teal-300 text-xl"
                ></ion-icon>
                <span>Email: foodly.app18@gmail.com</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
                <ion-icon
                  name="location"
                  className="text-teal-300 text-xl"
                ></ion-icon>
                <span>
                  Address: Genda Circle, Alkapuri, Vadodara, Gujarat, 390002
                </span>
              </div>
            </div>
            <div className="flex space-x-4 text-lg">
              <a href="https://www.facebook.com">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
              <a href="https://www.twitter.com">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
              <a href="https://www.instagram.com">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
              <a href="https://www.linkedin.com">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute z-0 w-40 h-40 bg-orange-400 rounded-full -right-28 -top-28"></div>
            <div className="absolute z-0 w-40 h-40 bg-orange-400 rounded-full -left-28 -bottom-16"></div>
            <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-70">
              <form
                onSubmit={handleSubmit(clickHandler)}
                className="flex flex-col space-y-4"
              >
                <div>
                  <label htmlFor="" className="label-text">
                    Your Name : <span className="text-red-600 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    value={creditial.username}
                    {...register("username", {
                      required: "Your name is required",
                    })}
                    onChange={onChange}
                    autoComplete="false"
                    className="input-field"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.username?.message}
                  </p>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="label-text">
                    Your Email Address :{" "}
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="email"
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
                    className="input-field"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.email?.message}
                  </p>
                </div>
                <div>
                  <label htmlFor="" className="label-text">
                    Contact Number :{" "}
                    <span className="text-red-600 text-lg">*</span>
                  </label>
                  <input
                    type="text"
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
                    className="input-field"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.phone?.message}
                  </p>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="label-text">
                    Message : <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <textarea
                    rows="3"
                    value={creditial.message}
                    {...register("message", {
                      required: "Message can't be empty",
                    })}
                    onChange={onChange}
                    autoComplete="false"
                    className="input-field"
                  ></textarea>
                  <p className="text-sm text-red-500 absolute">
                    {errors.message?.message}
                  </p>
                </div>

                <div className="flex justify-center drop-shadow-xl">
                  <button className="w-full text-black font-medium btn-txt bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg mt-5">
                    Send Message
                  </button>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
