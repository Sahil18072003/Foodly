import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";
import stateData from "../../json/State_City.json";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddForm.css";

function AddForm1() {
  const params = useParams();
  var resId = params.id;

  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Form | Foodly";
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const restaurant = JSON.parse(localStorage.getItem("restaurant"));

  const [city, setCity] = useState([]);

  const handleState = (e) => {
    const getState = e.target.value;

    const getCities = stateData.find(
      (stateData) => stateData.name === getState
    );

    setCity(getCities);
  };

  const [creditial, setCreditial] = useState({
    resname: restaurant?.resname ? restaurant?.resname : "",
    resadd: restaurant?.resadd ? restaurant?.resadd : "",
    respincode: restaurant?.respincode ? restaurant?.respincode : "",
    resstate: restaurant?.resstate ? restaurant?.resstate : "",
    rescity: "",
    rescontact: restaurant?.rescontact ? restaurant?.rescontact : "",
    reslandline: restaurant?.reslandline ? restaurant?.reslandline : "",
    ownercontact: user?.phone
      ? user?.phone
      : "" || restaurant?.ownercontact
      ? restaurant?.ownercontact
      : "",
    ownername:
      user?.lastname && user?.firstname
        ? user?.firstname + " " + user?.lastname
        : "" || restaurant?.ownername
        ? restaurant?.ownername
        : "",
    owneremail: user?.email
      ? user?.email
      : "" || restaurant?.owneremail
      ? restaurant?.owneremail
      : "",
  });

  const [showOtpModal, setShowOtpModal] = useState(false);

  const [otpCode, setOtpCode] = useState("");

  const [otpError, setOtpError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const openOtpModal = async () => {
    if (creditial.rescontact !== "") {
      // Api call
      const response = await fetch(
        `${host}/api/res/addRestaurant/addFrom/sendOtp`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rescontact: creditial.rescontact }), // body data type must match "Content-Type" header
        }
      );

      const json = await response.json(); // parses JSON response into native JavaScript objects

      if (json.resContact) {
        localStorage.setItem("resContact", json.resContact);

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
        setTimeout(() => {
          setShowOtpModal(true);
        }, 2000);
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

  const closeOtpModal = () => {
    setShowOtpModal(false);
    setOtpCode("");
    setOtpError("");
  };

  const otpSubmit = async () => {
    if (creditial.otpCode === "") {
      const response = await fetch(
        `${host}/api/res/addRestaurant/addFrom/checkOtp`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rescontact: creditial.rescontact }), // body data type must match "Content-Type" header
        }
      );

      const json = await response.json();

      if (json.genotp) {
        localStorage.removeItem("resContact");
        closeOtpModal();
      } else {
        toast.warning("Attention! Please provide correct OTP...", {
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
      toast.error("Oops! OTP is no more valid...", {
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

  const handleOtpChange = (e) => {
    setOtpCode(e.target.value);
    setOtpError("");
  };

  const nextFrom = () => {
    toast.info("Please click on Next to go to the next page", {
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
  };

  const currFrom = () => {
    toast.info("You are already on this page.", {
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
  };

  // useEffect(() => {
  //   updateRestaurantDetails();
  // }, []);

  // const updateRestaurantDetails = async () => {
  //   const result = await fetch(
  //     `${host}/api/res/getRestaurantDetails/${resId}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ _id: resId }),
  //     }
  //   );

  //   const data = await result.json();

  //   if (!data) {
  //     toast.error("Your Token has expired... Login again", {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       rtl: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });

  //     setTimeout(() => {
  //       localStorage.clear();
  //       navigate("/login");
  //     }, 2000);
  //   } else {
  //     let restaurant = data[0];
  //     setRestaurant(restaurant);

  //     // setCreditial({
  //     //   resname: restaurant?.resname ? restaurant?.resname : "",
  //     //   resadd: restaurant?.resadd ? restaurant?.resadd : "",
  //     //   respincode: restaurant?.respincode ? restaurant?.respincode : "",
  //     //   resstate: restaurant?.resstate ? restaurant?.resstate : "",
  //     //   rescity: "",
  //     //   rescontact: restaurant?.rescontact ? restaurant?.rescontact : "",
  //     //   reslandline: restaurant?.reslandline ? restaurant?.reslandline : "",
  //     //   ownercontact: restaurant?.ownercontact
  //     //     ? restaurant?.ownercontact
  //     //     : user?.phone
  //     //     ? user?.phone
  //     //     : "",
  //     //   ownername: restaurant?.ownername
  //     //     ? restaurant?.ownername
  //     //     : user?.lastname && user?.firstname
  //     //     ? user?.firstname + " " + user?.lastname
  //     //     : "",
  //     //   owneremail: restaurant?.owneremail
  //     //     ? restaurant?.owneremail
  //     //     : user?.email
  //     //     ? user?.email
  //     //     : "",
  //     // });
  //   }
  // };

  const clickHandler = async (e) => {
    // Retrieve state and city values
    let state = document.getElementById("resstate").value;
    let city = document.getElementById("rescity").value;

    // Check if all required fields are filled
    if (
      creditial.resname !== "" &&
      creditial.resadd !== "" &&
      creditial.respincode !== "" &&
      state !== "" &&
      city !== "" &&
      creditial.rescontact !== "" &&
      creditial.reslandline !== "" &&
      creditial.ownercontact !== "" &&
      creditial.ownername !== "" &&
      creditial.owneremail !== ""
    ) {
      // Check if the restaurant already exists
      if (restaurant) {
        // If restaurant exists, update its values
        const response = await fetch(
          `${host}/api/res/addRestaurant/addFrom/1/${restaurant._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              _id: restaurant?._id,
              resname: creditial.resname,
              resadd: creditial.resadd,
              respincode: creditial.respincode,
              resstate: state,
              rescity: city,
              rescontact: creditial.rescontact,
              reslandline: creditial.reslandline,
              ownercontact: creditial.ownercontact,
              ownername: creditial.ownername,
              owneremail: creditial.owneremail,
            }),
          }
        );

        const json = await response.json();

        if (json) {
          localStorage.setItem(
            "restaurant",
            JSON.stringify(json.updatedRestaurant)
          );

          toast.success("Restaurant Information Updated Successfully.", {
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
            navigate(
              `/addRestaurant/addForm/2?resId=${json.updatedRestaurant._id}`
            );
          }, 2000);
        } else {
          toast.error("Failed to update restaurant information.", {
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
        // If restaurant does not exist, create a new entry
        const response = await fetch(
          `${host}/api/res/addRestaurant/addFrom/1`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              resname: creditial.resname,
              resadd: creditial.resadd,
              respincode: creditial.respincode,
              resstate: state,
              rescity: city,
              rescontact: creditial.rescontact,
              reslandline: creditial.reslandline,
              ownerid: user._id,
              ownercontact: creditial.ownercontact,
              ownername: creditial.ownername,
              owneremail: creditial.owneremail,
            }),
          }
        );

        const json = await response.json();
        console.log(json);

        if (json) {
          localStorage.setItem("restaurant", JSON.stringify(json.restaurant));

          toast.success("New Restaurant Created Successfully.", {
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
            navigate(`/addRestaurant/addForm/2?resId=${json.restaurant._id}`);
          }, 2000);
        } else {
          toast.error("Failed to create new restaurant.", {
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
      }
    } else {
      toast.error("Please fill all the required fields...", {
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
          <div className="add-left-first p-4 rounded-lg">
            <div className="font-bold text-lg">
              1. Create your restaurant page
            </div>
            <hr />
            <button className="py-2" onClick={currFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-orange-400 rounded-full p-2 my-4">
                  <FontAwesomeIcon icon={fa1} className="text-white" />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Restaurant Information</div>
                  <div className="add-left-sub-text">
                    Restaurant name, address, contact no., owner details
                  </div>
                </div>
              </div>
            </button>
            <button className="py-2" onClick={nextFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-gray-300 rounded-full p-2 my-4">
                  <FontAwesomeIcon icon={fa2} />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Restaurant Type & Time</div>
                  <div className="add-left-sub-text">
                    Establishment & cuisine type, opening hours
                  </div>
                </div>
              </div>
            </button>
            <button className="pt-2" onClick={nextFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-gray-300 rounded-full p-2 my-4">
                  <FontAwesomeIcon icon={fa3} />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Upload Images</div>
                  <div className="add-left-sub-text">
                    Menu, Restaurant and Food <br /> images
                  </div>
                </div>
              </div>
            </button>
          </div>
          <div className="add-left-second p-4 rounded-lg">
            <span className="font-normal text-lg">
              2. Register for Online ordering
            </span>
          </div>
        </div>
        <div className="add-right">
          <div className="add-first-part">
            <div className="text-5xl font-bold text-center">
              Restaurant Information
            </div>
            <form onSubmit={handleSubmit(clickHandler)}>
              {/* first part */}
              <div className="add-right-first p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">
                    Restaurant Details
                  </div>
                  <div className="text-sm">Name, Address and Location</div>
                </div>
                <div className="px-3 pb-4">
                  <label htmlFor="resname" className="res-label-text">
                    Restaurant Name
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="text"
                    id="resname"
                    name="resname"
                    className="res-input-field"
                    value={creditial.resname}
                    {...register("resname", {
                      required: "Restaurant Name is required",
                      pattern: {
                        value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                        message:
                          "Only alphabetic characters are allowed in Name",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.resname?.message}
                  </p>
                </div>
                <div className="px-3 pt-2 pb-4">
                  <label htmlFor="resadd" className="res-label-text">
                    Restaurant Address :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <textarea
                    rows="2"
                    type="textarea"
                    id="resadd"
                    name="resadd"
                    className="res-input-field"
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
                <div className="px-3 pt-6">
                  <div className="text-2xl font-semibold">
                    Restaurant address details
                  </div>
                  <div className="text-sm">
                    Address details are basis the restaurant location mentioned
                    above
                  </div>
                </div>
                <div className="flex flex-column px-3 gap-6">
                  <div className="w-1/2 pb-2 pt-9">
                    <select
                      name="country"
                      id="country"
                      className="p-2 border-2 border-gray-300 rounded w-full"
                      disabled
                    >
                      <option className="p-3">India</option>
                    </select>
                  </div>
                  <div className="w-1/2 py-2">
                    <label
                      htmlFor="respincode"
                      className="res-pincode-label-text"
                    >
                      Pincode :<span className="text-red-600 text-lg"> *</span>
                    </label>
                    <input
                      type="text"
                      id="respincode"
                      name="respincode"
                      className="res-input-field"
                      value={creditial.respincode}
                      {...register("respincode", {
                        required: "Pincode is required",
                        pattern: {
                          value: /^(^\d{6}$)|(^[1-9][0-9]{2}\s?[0-9]{3}$)/,
                          message:
                            "Pincode must be 6 digits (Ex: 123456 or 123 456).",
                        },
                      })}
                      onChange={onChange}
                      autoComplete="false"
                    />
                    <p className="text-sm text-red-500 absolute">
                      {errors.respincode?.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-column px-3 pb-3 pt-6 gap-6">
                  <div className="w-1/2 py-2">
                    <select
                      id="resstate"
                      name="resstate"
                      className="p-2 border-2 border-gray-300 rounded w-full"
                      {...register("resstate", {
                        required: "State is required",
                      })}
                      onChange={(e) => handleState(e)}
                    >
                      <option value="">Select State</option>
                      {stateData &&
                        stateData.map((getstate) => (
                          <option value={getstate.name} className="p-3">
                            <div>{getstate.name}</div>
                          </option>
                        ))}
                    </select>
                    <p className="text-sm text-red-500 absolute">
                      {errors.resstate?.message}
                    </p>
                  </div>
                  <div className="w-1/2 py-2">
                    <select
                      id="rescity"
                      name="rescity"
                      className="p-2 border-2 border-gray-300 rounded w-full"
                      {...register("rescity", {
                        required: "City is required",
                      })}
                    >
                      <option value="">Select City</option>
                      {city.cities &&
                        city.cities.map((getcity) => (
                          <option value={getcity}>{getcity}</option>
                        ))}
                    </select>
                    <p className="text-sm text-red-500 absolute">
                      {errors.rescity?.message}
                    </p>
                  </div>
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
                    <label htmlFor="rescontact" className="res-label-text">
                      Restaurant Contact :
                      <span className="text-red-600 text-lg"> *</span>
                    </label>
                    <input
                      type="contact"
                      id="rescontact"
                      name="rescontact"
                      className="res-input-field"
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
                  <div className="w-1/5 text-md font-semibold ml-6 mt-7 mb-4 bg-orange-400 hover:bg-orange-500 border-2 border-orange-400 rounded shadow-md hover:shadow-lg">
                    <button
                      className="text-white-800 duration-500 text-middle"
                      onClick={openOtpModal}
                    >
                      <div className="px-8 pt-2 pb-1">Verify</div>
                    </button>
                    {showOtpModal && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg lg:w-1/4 md:w-1/2 sm:w-1/2">
                          <div className="py-7 px-6">
                            <input
                              type="text"
                              placeholder="Enter OTP"
                              value={otpCode}
                              onChange={handleOtpChange}
                              className="input-field mb-2"
                            />
                            <p className="text-red-500 text-sm mb-4">
                              {otpError}
                            </p>
                            <div className="flex justify-end">
                              <button
                                onClick={otpSubmit}
                                className="text-black font-semibold mx-2 px-4 py-2 rounded bg-orange-400 hover:bg-orange-500"
                              >
                                Submit
                              </button>
                              <button
                                onClick={closeOtpModal}
                                className="text-gray-700 font-semibold mx-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Restaurant Landline: */}
                <div className="px-3 pt-3 pb-6">
                  <label htmlFor="reslandline" className="res-label-text">
                    Restaurant Landline :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="contact"
                    id="reslandline"
                    name="reslandline"
                    className="res-input-field"
                    value={creditial.reslandline}
                    {...register("reslandline", {
                      required: "Restaurant Landline Number is required",
                      pattern: {
                        value: /^[0-9]{12}$/,
                        message: "Restaurant Landline Number is not valid",
                      },
                      maxLength: {
                        value: 12,
                        message:
                          "Max 12 characters for Restaurant Landline Number",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.reslandline?.message}
                  </p>
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
                    <label htmlFor="ownercontact" className="res-label-text">
                      Restaurant Owner Contact :
                      <span className="text-red-600 text-lg"> *</span>
                    </label>
                    <input
                      type="contact"
                      id="ownercontact"
                      name="ownercontact"
                      className="res-input-field"
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
                        value: /^[A-Za-z]+(?: [A-Za-z]+)?$/,
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
                <div className="px-3 pt-4 pb-6">
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
                    readOnly={user ? true : false}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.owneremail?.message}
                  </p>
                </div>
              </div>

              {/* footer */}
              <div className="add-footer">
                <div className="md:flex md:p-0 absolute md:static w-full md:w-auto transition-all duration-500 ease-in align-middle justify-center items-center gap-20">
                  <button className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 hover:bg-orange-500 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                    <Link
                      className="text-white-900 duration-500"
                      to="/addRestaurant"
                    >
                      Back
                    </Link>
                  </button>

                  <div className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 hover:bg-orange-500 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                    <button className="text-gray-800 duration-500">Next</button>
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
