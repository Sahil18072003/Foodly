import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3, fa4 } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./AddForm.css";

function AddForm4() {
  const host = "http://localhost:5000";

  const user = JSON.parse(localStorage.getItem("user"));

  const restaurant = JSON.parse(localStorage.getItem("restaurant"))
    ? JSON.parse(localStorage.getItem("restaurant"))
    : "";

  const [creditial, setCreditial] = useState({
    deliverymenuimg: restaurant?.deliverymenuimg
      ? restaurant?.deliverymenuimg
      : [],
    ownercontact: restaurant?.ownercontact ? restaurant?.ownercontact : "",
    ownername: restaurant?.ownername ? restaurant?.ownername : "",
    owneremail: restaurant?.owneremail ? restaurant?.owneremail : "",
    deliverycontact: restaurant?.deliverycontact
      ? restaurant?.deliverycontact
      : "",
    deliverylandline: restaurant?.deliverylandline
      ? restaurant?.deliverylandline
      : "",
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

  /* Upload Profile photo to cloudinary */
  const uploadImageToCloudinary = async (file, preset) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddaat3aev/image/upload",
        formData
      );

      const uploadedImgData = {
        statusText: response.statusText,
        profileImage: response.data.secure_url,
        publicId: response.data.public_id,
      };

      return uploadedImgData.profileImage;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Image size too large", {
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
        toast.error("Something went wrong. Try Again", {
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
      console.log("Error in uploading profile photo to cloudinary : ", error);
      return null;
    }
  };

  const clickHandler = async (e) => {
    // Get all radio with name "deliveryrefer"
    const deliveryrefer = document.querySelector(
      'input[name="deliveryrefer"]:checked'
    )?.value;

    // Get all radio with name "deliverytime"
    const deliverytime = document.querySelector(
      'input[name="deliverytime"]:checked'
    )?.value;

    const deliverymenuImageUrls = await Promise.all(
      creditial.deliverymenuimg.map((file) =>
        uploadImageToCloudinary(file, "delivery_menu_img")
      )
    );

    // Check if all required fields are filled
    if (
      deliveryrefer !== "" &&
      deliverytime !== "" &&
      deliverymenuImageUrls !== "" &&
      creditial.ownercontact !== "" &&
      creditial.ownername !== "" &&
      creditial.owneremail !== "" &&
      creditial.deliverycontact !== "" &&
      creditial.deliverylandline !== ""
    ) {
      // If restaurant exists, update its values
      const response = await fetch(
        `${host}/api/res/addRestaurant/addFrom/4/${restaurant?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: restaurant?._id,
            deliveryrefer: deliveryrefer,
            deliverytime: deliverytime,
            deliverymenuimg: deliverymenuImageUrls,
            ownercontact: creditial.ownercontact,
            ownername: creditial.ownername,
            owneremail: creditial.owneremail,
            deliverycontact: creditial.deliverycontact,
            deliverylandline: creditial.deliverylandline,
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
            `/addRestaurant/addForm/5?resId=${json.updatedRestaurant._id}`
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

  const removeImage = (name, index) => {
    setCreditial((prevState) => ({
      ...prevState,
      [name]: prevState[name].filter((_, i) => i !== index),
    }));
  };

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // File input
      const fileList = Array.from(files);
      setCreditial((prevState) => ({
        ...prevState,
        [name]: [...(prevState[name] || []), ...fileList],
      }));
    } else {
      // Non-file input
      setCreditial({ ...creditial, [name]: value });
    }
  };

  return (
    <div className="add-res-page">
      <div className="add-res-content">
        <div className="add-left-2">
          <div className="add-left-first p-4 rounded-lg">
            <div className="font-normal text-lg">
              1. Create your restaurant page
            </div>
          </div>
          <div className="add-left-second p-4 rounded-lg">
            <div className="font-bold text-lg">
              2. Register for Online ordering
            </div>
            <hr />
            <button className="pt-2" onClick={currFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-orange-400 rounded-full p-2 my-4">
                  <FontAwesomeIcon icon={fa1} />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Restaurant Information</div>
                  <div className="add-left-sub-text">
                    Delivery timings, menu & contact information
                  </div>
                </div>
              </div>
            </button>
            <button className="pt-2" onClick={nextFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-gray-300 rounded-full p-2 my-4">
                  <FontAwesomeIcon icon={fa2} />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Upload Documents</div>
                  <div className="add-left-sub-text">
                    PAN, GST, FSSAI and bank account details
                  </div>
                </div>
              </div>
            </button>
            <button className="pt-2" onClick={nextFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-gray-300 rounded-full p-2 my-4">
                  <FontAwesomeIcon icon={fa3} />
                </div>
                <div className="w-5/6 p-2">
                  <div className="add-left-text">Partnership Plans</div>
                  <div className="add-left-sub-text">Select your plan</div>
                </div>
              </div>
            </button>
            <button
              className="pt-2 border-2 border-gray-900"
              onClick={nextFrom}
            >
              <div className="flex flex-column">
                <div className="w-1/6 bg-gray-300 rounded-full p-2 my-4">
                  <FontAwesomeIcon icon={fa4} />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Partner Contract</div>
                  <div className="add-left-sub-text">
                    Service fee details, other charges and T&Cs
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="add-right">
          <div className="add-first-part">
            <div className="text-5xl font-bold text-center">
              Restaurant information
            </div>
            <form onSubmit={handleSubmit(clickHandler)}>
              {/* first part */}
              <div className="add-right-first p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">
                    General restaurant information
                  </div>
                  <div className="text-sm">
                    Update delivery timings and menu for online ordering
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-lg font-medium">
                    Did a Foodly representative refer you to this platform?
                  </div>
                  <div className="flex flex-column py-2 gap-9">
                    <div className="flex flex-column gap-3">
                      <input
                        type="radio"
                        name="deliveryrefer"
                        id="yes"
                        value="Yes"
                        {...register("deliveryrefer", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                        checked
                      />
                      <label htmlFor="yes" className="text-lg">
                        Yes
                      </label>
                    </div>
                    <div className="flex flex-column gap-3">
                      <input
                        type="radio"
                        name="deliveryrefer"
                        id="no"
                        value="No"
                        {...register("deliveryrefer", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      <label htmlFor="no" className="text-lg">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="p-3">
                  <div className="text-lg font-medium inline-block">
                    What are the timings during which customers can place online
                    orders?
                  </div>
                  <div className="py-2">
                    <div className="flex flex-row gap-3">
                      <input
                        type="radio"
                        name="deliverytime"
                        id="same"
                        value="Same"
                        {...register("deliverytime", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                        checked
                      />
                      <label htmlFor="same" className="text-lg">
                        Delivery and restaurant timings are same
                      </label>
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="flex flex-cloumn gap-3">
                      <input
                        type="radio"
                        name="deliverytime"
                        id="different"
                        value="Different"
                        {...register("deliverytime", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      <label htmlFor="different" className="text-lg">
                        Delivery timings are different from restaurant timings
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* second part */}
              <div className="add-menu-first rounded-lg">
                <div className="text-2xl font-semibold">
                  Upload online ordering menu photos
                </div>
                <div className="text-sm">
                  Customers will choose items from this menu while placing
                  online orders
                </div>

                <div className="menu-img border-2 border-gray-900">
                  <input
                    type="file"
                    id="deliverymenuimg"
                    name="deliverymenuimg"
                    accept="image/*"
                    {...register("deliverymenuimg", {
                      required: "Delivery Menu is required",
                    })}
                    onChange={onChange}
                  />

                  <label htmlFor="deliverymenuimg" className="menu-warrper">
                    <div className="text-center sub-menu-img">
                      <div className="mb-2">
                        <i className="fa fa-camera fa-2x"></i>
                      </div>
                      <div className="text-uppercase">Add Photos</div>
                    </div>
                  </label>

                  {creditial.deliverymenuimg &&
                    creditial.deliverymenuimg.map((image, index) => (
                      <div key={index} className="uploaded-div">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                          className="uploaded-image"
                        />
                        <button
                          className="uploaded-btn"
                          onClick={() => removeImage("deliverymenuimg", index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>

                <p className="text-sm text-red-500 absolute">
                  {errors.deliverymenuimg?.message}
                </p>
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
                      readOnly={user ? true : false}
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

              {/* forth part */}
              <div className="add-right-second p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">
                    Priority contact numbers
                  </div>
                  <div className="text-sm">
                    These will be used for resolving order specific issues
                  </div>
                </div>
                {/* Delivery Contact: */}
                <div className="flex flex-column px-3 py-1">
                  <div className="w-4/5 pb-4">
                    <label htmlFor="deliverycontact" className="res-label-text">
                      Mobile Number :
                      <span className="text-red-600 text-lg"> *</span>
                    </label>
                    <input
                      type="contact"
                      id="deliverycontact"
                      name="deliverycontact"
                      className="res-input-field"
                      value={creditial.deliverycontact}
                      {...register("deliverycontact", {
                        required: "Delivery mobile number is required",
                        pattern: {
                          value: /^[6-9]{1}[0-9]{9}$/,
                          message: "Delivery mobile number is not valid",
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
                      {errors.deliverycontact?.message}
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

                {/* Delivery Landline: */}
                <div className="px-3 pb-6">
                  <label htmlFor="deliverylandline" className="res-label-text">
                    Landline Number :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="contact"
                    id="deliverylandline"
                    name="deliverylandline"
                    className="res-input-field"
                    value={creditial.deliverylandline}
                    {...register("deliverylandline", {
                      required: "Delivery landline number is required",
                      pattern: {
                        value: /^[0-9]{12}$/,
                        message: "Delivery landline number is not valid",
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
                    {errors.deliverylandline?.message}
                  </p>
                </div>
              </div>

              {/* footer */}
              <div className="add-footer">
                <div className="md:flex md:p-0 absolute md:static w-full md:w-auto transition-all duration-500 ease-in align-middle justify-center items-center gap-20">
                  <button className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 hover:bg-orange-500 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                    <Link
                      className="text-white-900 duration-500"
                      to="/dashboard"
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

export default AddForm4;
