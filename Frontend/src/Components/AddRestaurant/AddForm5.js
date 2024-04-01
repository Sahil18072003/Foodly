import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  fa2,
  fa3,
  fa4,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./AddForm.css";

function AddForm5() {
  const host = "http://localhost:5000";

  const user = JSON.parse(localStorage.getItem("user"));

  const restaurant = JSON.parse(localStorage.getItem("restaurant"))
    ? JSON.parse(localStorage.getItem("restaurant"))
    : "";

  const [creditial, setCreditial] = useState({
    pannumber: restaurant?.pannumber ? restaurant?.pannumber : "",
    panname: restaurant?.panname ? restaurant?.panname : "",
    panimg: restaurant?.panimg ? restaurant?.panimg : "",
    isgst: restaurant?.isgst ? restaurant?.isgst : "",
    gstnumber: restaurant?.gstnumber ? restaurant?.gstnumber : "",
    is5gst: restaurant?.is5gst ? restaurant?.is5gst : "",
    gstimg: restaurant?.gstimg ? restaurant?.gstimg : "",
    fssainumber: restaurant?.fssainumber ? restaurant?.fssainumber : "",
    fssaiimg: restaurant?.fssaiimg ? restaurant?.fssaiimg : "",
    bankaccnumber: restaurant?.bankaccnumber ? restaurant?.bankaccnumber : "",
    bankholdername: restaurant?.bankholdername
      ? restaurant?.bankholdername
      : "",
    bankifsccode: restaurant?.bankaccnumber ? restaurant?.bankaccnumber : "",
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
      console.log(json);

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
                <div className="w-1/6 bg-green-400 rounded-full px-2 pt-2 pb-1 my-4">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-6 h-6" />
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
                <div className="w-1/6 bg-orange-400 rounded-full p-2 my-4">
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
              Upload Legal Documents
            </div>
            <form onSubmit={handleSubmit(clickHandler)}>
              {/* first part */}
              <div className="add-menu-first rounded-lg">
                <div className="px-3 pb-3">
                  <div className="text-2xl font-semibold">PAN details</div>
                  <div className="text-sm">
                    We will verify the legal entity with this information
                  </div>
                </div>
                <div className="px-3 pb-4">
                  <label htmlFor="pannumber" className="res-label-text">
                    PAN Number :<span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="text"
                    id="pannumber"
                    name="pannumber"
                    className="res-input-field"
                    value={creditial.pannumber}
                    {...register("pannumber", {
                      required: "PAN Number is required",
                      pattern: {
                        value: /^[0-9A-Z]{10}$/,
                        message: "PAN Number is not valid",
                      },
                      maxLength: {
                        value: 10,
                        message: "Max 10 characters for PAN Number",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.pannumber?.message}
                  </p>
                </div>
                <div className="px-3 pb-4">
                  <label htmlFor="panname" className="res-label-text">
                    Name on PAN card
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="text"
                    id="panname"
                    name="panname"
                    className="res-input-field"
                    value={creditial.panname}
                    {...register("panname", {
                      required: "Name on PAN card is required",
                      pattern: {
                        value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                        message:
                          "Only alphabetic characters are allowed in Name on PAN card",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.panname?.message}
                  </p>
                </div>
                <div className="px-3 pb-4">
                  <div className="pan-img">
                    <input
                      type="file"
                      id="panimg"
                      name="panimg"
                      accept=".jpg, .png, .pdf"
                      {...register("panimg", {
                        required: "PAN Image is required",
                      })}
                      onChange={onChange}
                    />

                    <label htmlFor="panimg" className="pan-warrper">
                      <div className="text-center sub-pan-img">
                        <div className="py-1">
                          <i className="fa fa-arrow-up-from-bracket fa-lg"></i>
                        </div>
                        <div className="text-uppercase px-3 py-1">
                          Upload PAN Card Image
                        </div>
                      </div>
                    </label>

                    {creditial.panimg &&
                      creditial.panimg.map((image, index) => (
                        <div key={index} className="uploaded-div-pan">
                          <span>{image.name}</span>{" "}
                          <button
                            className="uploaded-btn-pan"
                            onClick={() => removeImage("panimg", index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                  </div>
                  <p className="text-sm text-red-500 absolute">
                    {errors.panimg?.message}
                  </p>
                </div>
              </div>

              {/* second part */}
              <div className="add-menu-first rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">GST information</div>
                  <div className="text-sm">
                    This will help us in calculating your taxes, verify PAN to
                    proceed
                  </div>
                </div>
                <div className="px-3 pt-3">
                  <div className="text-lg font-medium">
                    Is your restaurant GST registered?
                  </div>
                  <div className="flex flex-column py-2 gap-9">
                    <div className="flex flex-column gap-3">
                      <input
                        type="radio"
                        name="isgst"
                        id="yesgst"
                        value="Yes"
                        {...register("isgst", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                        defaultChecked
                      />
                      <label htmlFor="yes" className="text-lg">
                        Yes
                      </label>
                    </div>
                    <div className="flex flex-cloumn gap-3">
                      <input
                        type="radio"
                        name="isgst"
                        id="nogst"
                        value="No"
                        {...register("isgst", {
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
                <div className="px-3 pb-6">
                  <div className="pan-img">
                    <input
                      type="file"
                      id="gstimg"
                      name="gstimg"
                      accept=".jpg, .png, .pdf"
                      {...register("gstimg", {
                        required: "GST Image is required",
                      })}
                      onChange={onChange}
                    />

                    <label htmlFor="gstimg" className="pan-warrper">
                      <div className="text-center sub-pan-img">
                        <div className="py-1">
                          <i className="fa fa-arrow-up-from-bracket fa-lg"></i>
                        </div>
                        <div className="text-uppercase px-3 py-1">
                          Upload GST Certificate
                        </div>
                      </div>
                    </label>

                    {creditial.panimg &&
                      creditial.panimg.map((image, index) => (
                        <div key={index} className="uploaded-div-pan">
                          <span>{image.name}</span>{" "}
                          <button
                            className="uploaded-btn-pan"
                            onClick={() => removeImage("panimg", index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                  </div>
                  <p className="text-sm text-red-500 absolute">
                    {errors.panimg?.message}
                  </p>
                </div>
                <div className="p-3">
                  <div className="text-lg font-medium">
                    Do you charge 5% GST as restaurant services on all your menu
                    items ?
                  </div>
                  <div className="flex flex-column py-2 gap-9">
                    <div className="flex flex-column gap-3">
                      <input
                        type="radio"
                        name="isgst5"
                        id="yes"
                        value="Yes"
                        {...register("isgst", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      <label htmlFor="yes" className="text-lg">
                        Yes
                      </label>
                    </div>
                    <div className="flex flex-cloumn gap-3">
                      <input
                        type="radio"
                        name="isgst5"
                        id="no"
                        value="No"
                        {...register("isgst", {
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
              </div>

              {/* third part */}
              <div className="add-menu-first rounded-lg">
                <div className="text-2xl font-semibold">FSSAI certificate</div>
                <div className="text-sm">
                  This is required to comply with regulations on food safety
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
                          // src={URL.createObjectURL(image)}
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

              {/* forth part */}
              <div className="add-menu-first rounded-lg">
                <div className="text-2xl font-semibold">Bank details</div>
                <div className="text-sm">
                  Let us know where to deposit your money
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

export default AddForm5;
