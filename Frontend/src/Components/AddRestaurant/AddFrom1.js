import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddForm.css";

function AddForm1() {
  const host = "http://localhost:5000";

  const [creditial, setCreditial] = useState({
    resname: "",
    resadd: "",
    rescontact: "",
    reslandline: "",
    ownercontact: "",
    ownername: "",
    owneremail: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Form | Foodly";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const contactVerify = async () => {
    if (creditial.rescontact !== "") {
      // Api call
      const response = await fetch(`${host}/api/res/`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rescontact: creditial.rescontact }), // body data type must match "Content-Type" header
      });

      const json = await response.json(); // parses JSON response into native JavaScript objects

      if (json.userid) {
        localStorage.setItem("res", json.email);
        localStorage.setItem("resotp", json.resotp);
        // localStorage.setItem("id", json.userid);

        toast.success("OTP has been sent to your phone number.", {
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
        toast.warning("Attention! Please provide correct contact number...", {
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
      console.log("Incorrect contact number");
    }
  };

  const clickHandler = async (e) => {
    if (
      creditial.resname !== "" &&
      creditial.resadd !== "" &&
      creditial.rescontact !== "" &&
      creditial.reslandline !== "" &&
      creditial.ownercontact !== "" &&
      creditial.ownername !== "" &&
      creditial.owneremail !== ""
    ) {
      // Api call
      const response = await fetch(`${host}/api/res/addRestaurant/addFrom/1`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resname: creditial.resname,
          resadd: creditial.resadd,
          rescontact: creditial.rescontact,
          reslandline: creditial.reslandline,
          ownercontact: creditial.ownercontact,
          ownername: creditial.ownername,
          owneremail: creditial.owneremail,
        }), // body data type must match "Content-Type" header
      });

      // parses JSON response into native JavaScript objects
      const json = await response?.json();
      console.log(json);

      if (json) {
        toast.success("Restaurant Information Submmitted Successfully.", {
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
        setTimeout(() => {
          navigate(`/addRestaurant/addForm/2?resId=${json._id}`);
        }, 2000);
      } else {
        toast.error("Your email has been already used...", {
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
      toast.error("Please fill all the required field...", {
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
    <div className="add-res-page">
      <div className="add-res-content">
        <div className="add-left">
          <div className="add-left-first py-4 px-4 rounded-lg">
            <div className="font-bold text-lg">
              1. Create your restaurant page
            </div>
            <hr />
            <button className="py-2 border-2 border-gray-900">
              <Link to="/addRestaurant/addForm/1">
                <div className="flex flex-column">
                  <div className="w-1/6 border-2 border-gray-900 rounded-full p-1 my-4">
                    <FontAwesomeIcon icon={fa1} />
                  </div>
                  <div className="w-5/6 p-1">
                    <div className="add-left-text">Restaurant Information</div>
                    <div className="add-left-sub-text">
                      Restaurant name, address, contact no., owner details
                    </div>
                  </div>
                </div>
              </Link>
            </button>
            <button className="py-2 border-2 border-gray-900">
              <Link to="/addRestaurant/addForm/2">
                <div className="flex flex-column">
                  <div className="w-1/6 border-2 border-gray-900 rounded-full p-1 my-4">
                    <FontAwesomeIcon icon={fa2} />
                  </div>
                  <div className="w-5/6 p-1">
                    <div className="add-left-text">Restaurant Type & Time</div>
                    <div className="add-left-sub-text">
                      Establishment & cuisine type, opening hours
                    </div>
                  </div>
                </div>
              </Link>
            </button>
            <button className="pt-2 pb-1 border-2 border-gray-900">
              <Link to="/addRestaurant/addForm/3">
                <div className="flex flex-column">
                  <div className="w-1/6 border-2 border-gray-900 rounded-full p-1 my-1">
                    <FontAwesomeIcon icon={fa3} />
                  </div>
                  <div className="w-5/6">
                    <div className="add-left-text">Upload Images</div>
                    <div className="add-left-sub-text">
                      Menu, restaurant, food images
                    </div>
                  </div>
                </div>
              </Link>
            </button>
          </div>
          <div className="add-left-second p-4 rounded-lg">
            <span className="font-bold text-lg">
              2. Register for Online ordering
            </span>
          </div>
        </div>
        <div className="add-right">
          <div className="add-first-part">
            <div className="text-5xl">Restaurant Information</div>
            <form onSubmit={handleSubmit(clickHandler)}>
              {/* first part */}
              <div className="add-right-first p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">
                    Restaurant Details
                  </div>
                  <div className="text-sm">Name, Address and Location</div>
                </div>
                <div className="px-3 py-1">
                  <label htmlFor="resname" className="label-text">
                    Restaurant Name :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="text"
                    id="resname"
                    name="resname"
                    className="input-field"
                    value={creditial.resname}
                    {...register("resname", {
                      required: "Restaurant Name is required",
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.resname?.message}
                  </p>
                </div>
                <div className="px-3 py-3">
                  <label htmlFor="resadd" className="label-text">
                    Restaurant Address :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <textarea
                    rows="3"
                    type="textarea"
                    id="resadd"
                    name="resadd"
                    className="input-field"
                    value={creditial.resadd}
                    {...register("resadd", {
                      required: "Restaurant Address is required",
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.resadd?.message}
                  </p>
                </div>
              </div>

              {/* second part */}
              <div className="add-right-second p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">
                    Contact Number at Restaurant
                  </div>
                  <div className="text-sm">
                    Your customers will call on this number for general
                    enquiries
                  </div>
                </div>
                {/* Restaurant Contact: */}
                <div className="flex flex-column px-3 py-1">
                  <div className="w-4/5 pb-4">
                    <label htmlFor="rescontact" className="label-text">
                      Restaurant Contact :
                      <span className="text-red-600 text-lg"> *</span>
                    </label>
                    <input
                      type="contact"
                      id="rescontact"
                      name="rescontact"
                      className="input-field"
                      value={creditial.rescontact}
                      {...register("rescontact", {
                        required: "Restaurant Contact Number is required",
                        pattern: {
                          value: /^[6-9]{1}[0-9]{9}$/,
                          message: "Restaurant Contact Number is not valid",
                        },
                        maxLength: {
                          value: 10,
                          message:
                            "Max 10 characters for Restaurant Contact Number",
                        },
                      })}
                      onChange={onChange}
                      autoComplete="false"
                    />
                    <p className="text-sm text-red-500 absolute">
                      {errors.rescontact?.message}
                    </p>
                  </div>
                  <div className="w-1/5 text-md font-semibold ml-6 mt-7 mb-4 bg-orange-400 border-2 border-orange-400 rounded shadow-md hover:shadow-lg">
                    <Link
                      className="text-white-800 duration-500 text-middle"
                      onClick={contactVerify}
                    >
                      <div className="px-8 pt-2 pb-1">Verify</div>
                    </Link>
                  </div>
                </div>
                <p className="flex align-middle items-center justify-between">
                  <span className="w-1/5 border-b-2 border-gray-200"></span>
                  or want to share landline number
                  <span className="w-1/5 border-b-2 border-gray-200"></span>
                </p>

                {/* Restaurant Landline: */}
                <div className="flex flex-column px-3 pt-1">
                  <div className="w-4/5">
                    <label htmlFor="reslandline" className="label-text">
                      Restaurant Landline :
                      <span className="text-red-600 text-lg"> *</span>
                    </label>
                    <input
                      type="contact"
                      id="reslandline"
                      name="reslandline"
                      className="input-field"
                      value={creditial.reslandline}
                      {...register("reslandline", {
                        required: "Restaurant Landline Number is required",
                        pattern: {
                          value: /^[6-9]{1}[0-9]{9}$/,
                          message: "Restaurant Landline Number is not valid",
                        },
                        maxLength: {
                          value: 10,
                          message:
                            "Max 10 characters for Restaurant Landline Number",
                        },
                      })}
                      onChange={onChange}
                      autoComplete="false"
                    />
                    <p className="text-sm text-red-500 absolute">
                      {errors.reslandline?.message}
                    </p>
                  </div>
                  <div className="w-1/5 text-md font-semibold ml-6 mt-7 mb-4 bg-orange-400 border-2 border-orange-400 rounded shadow-md hover:shadow-lg">
                    <Link
                      className="text-white-800 duration-500 text-middle"
                      to="/login"
                    >
                      <div className="px-8 pt-2 pb-1">Verify</div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* third part */}
              <div className="add-right-third p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">
                    Restaurant owner details
                  </div>
                  <div className="text-sm">
                    These will be used to share revenue related communications
                  </div>
                </div>
                <div className="flex flex-column px-3 py-1">
                  <div className="w-4/5">
                    <label htmlFor="ownercontact" className="label-text">
                      Restaurant Owner Contact :
                      <span className="text-red-600 text-lg"> *</span>
                    </label>
                    <input
                      type="contact"
                      id="ownercontact"
                      name="ownercontact"
                      className="input-field"
                      value={creditial.ownercontact}
                      {...register("ownercontact", {
                        required: "Restaurant Owner Contact Number is required",
                        pattern: {
                          value: /^[6-9]{1}[0-9]{9}$/,
                          message:
                            "Restaurant Owner Contact Number is not valid",
                        },
                        maxLength: {
                          value: 10,
                          message:
                            "Max 10 characters for Restaurant Owner Contact Number",
                        },
                      })}
                      onChange={onChange}
                      autoComplete="false"
                    />
                    <p className="text-sm text-red-500 absolute">
                      {errors.ownercontact?.message}
                    </p>
                  </div>
                  <div className="w-1/5 text-md font-semibold ml-6 mt-7 mb-4 bg-orange-400 border-2 border-orange-400 rounded shadow-md hover:shadow-lg">
                    <Link
                      className="text-white-800 duration-500 text-middle"
                      to="/login"
                    >
                      <div className="px-8 pt-2 pb-1">Verify</div>
                    </Link>
                  </div>
                </div>
                <div className="px-3 py-1">
                  <label htmlFor="ownername" className="label-text">
                    Restaurant Owner Full Name :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ownername"
                    name="ownername"
                    className="input-field"
                    value={creditial.ownername}
                    {...register("ownername", {
                      required: "Restaurant Owner Name is required",
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message:
                          "Only alphabetic characters are allowed in Name",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.ownername?.message}
                  </p>
                </div>
                <div className="px-3 py-3">
                  <label htmlFor="owneremail" className="label-text">
                    Restaurant Owner Email Address :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="email"
                    id="owneremail"
                    name="owneremail"
                    className="input-field"
                    value={creditial.owneremail}
                    {...register("owneremail", {
                      required: "Restaurant Owner Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                        message: "Restaurant Owner Email is not valid",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.owneremail?.message}
                  </p>
                </div>
              </div>

              <div className="add-footer">
                <div className="md:flex md:p-0 absolute md:static w-full md:w-auto transition-all duration-500 ease-in align-middle justify-center items-center gap-20">
                  <div className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                    <Link
                      className="text-white-900 duration-500"
                      to="/addRestaurant"
                    >
                      Back
                    </Link>
                  </div>

                  <div className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                    <Link
                      className="text-gray-800 duration-500"
                      to="/addRestaurant/addForm/2"
                    >
                      Next
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddForm1;
