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
    panimg: [],
    gstnumber: restaurant?.gstnumber ? restaurant?.gstnumber : "",
    gstimg: [],
    fssainumber: restaurant?.fssainumber ? restaurant?.fssainumber : "",
    fssaiimg: [],
    bankaccnumber: restaurant?.bankaccnumber ? restaurant?.bankaccnumber : "",
    reenterbankaccnumber: restaurant?.bankaccnumber
      ? restaurant?.bankaccnumber
      : "",
    bankholdername: restaurant?.bankholdername
      ? restaurant?.bankholdername
      : "",
    bankacctype: restaurant?.bankacctype ? restaurant?.bankacctype : "",
    bankifsccode: restaurant?.bankaccnumber ? restaurant?.bankaccnumber : "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Form | Foodly";
  }, []);

  const {
    register,
    handleSubmit,
    watch,
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
    // Get all radio with name "rescategory"
    const isgst = document.querySelector('input[name="isgst"]:checked')?.value;

    const isgst5 = document.querySelector(
      'input[name="isgst5"]:checked'
    )?.value;

    console.log(isgst, isgst5);

    const panImageUrls = await Promise.all(
      creditial.panimg.map((file) => uploadImageToCloudinary(file, "pan_photo"))
    );

    const gstImageUrls = await Promise.all(
      creditial.gstimg.map((file) => uploadImageToCloudinary(file, "gst_photo"))
    );

    const fssaiImageUrls = await Promise.all(
      creditial.fssaiimg.map((file) =>
        uploadImageToCloudinary(file, "fssai_photo")
      )
    );

    // Check if all required fields are filled
    if (
      creditial.pannumber !== "" &&
      creditial.panname !== "" &&
      panImageUrls !== "" &&
      isgst !== "" &&
      creditial.gstnumber !== "" &&
      gstImageUrls !== "" &&
      isgst5 !== "" &&
      creditial.fssainumber !== "" &&
      fssaiImageUrls !== "" &&
      creditial.bankaccnumber !== "" &&
      creditial.bankacctype !== "" &&
      creditial.bankifsccode !== ""
    ) {
      // If restaurant exists, update its values
      const response = await fetch(
        `${host}/api/res/addRestaurant/addFrom/5/${restaurant?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: restaurant?._id,
            pannumber: creditial.pannumber,
            panname: creditial.panname,
            panimg: panImageUrls,
            isgst: isgst,
            gstnumber: creditial.gstnumber,
            gstimg: gstImageUrls,
            isgst5: isgst5,
            fssainumber: creditial.fssainumber,
            fssaiimg: fssaiImageUrls,
            bankaccnumber: creditial.bankaccnumber,
            bankacctype: creditial.bankacctype,
            bankifsccode: creditial.bankifsccode,
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
            `/addRestaurant/addForm/6?resId=${json.updatedRestaurant._id}`
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
      const fileList = Array.from(files);
      setCreditial((prevState) => ({
        ...prevState,
        [name]: [...(prevState[name] || []), ...fileList],
      }));
    } else {
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
                      required: "PAN number is required",
                      pattern: {
                        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                        message: "PAN number is not valid",
                      },
                      maxLength: {
                        value: 10,
                        message: "Max 10 characters for PAN number",
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
                        value: /^[A-Za-z]+(\s[A-Za-z]+){0,2}$/,
                        message:
                          "Name on PAN card should contain only alphabetic characters and maximum of two spaces",
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
                      accept=".jpg, .png"
                      {...register("panimg", {
                        required: "PAN image is required",
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
                    <p className="text-sm text-red-500 absolute">
                      {errors.isgst?.message}
                    </p>
                  </div>
                </div>
                <div className="px-3 pb-4">
                  <label htmlFor="gstnumber" className="res-label-text">
                    GSTIN Number :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="text"
                    id="gstnumber"
                    name="gstnumber"
                    className="res-input-field"
                    value={creditial.gstnumber}
                    {...register("gstnumber", {
                      required: "GSTIN number is required",
                      pattern: {
                        value:
                          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z][0-9A-Z]{1}$/,
                        message: "GSTIN number is not valid",
                      },
                      maxLength: {
                        value: 15,
                        message: "Max 15 characters for GSTIN number",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.gstnumber?.message}
                  </p>
                </div>
                <div className="px-3 pb-6">
                  <div className="gst-img">
                    <input
                      type="file"
                      id="gstimg"
                      name="gstimg"
                      accept=".jpg, .png"
                      {...register("gstimg", {
                        required: "GST image is required",
                      })}
                      onChange={onChange}
                    />
                    <label htmlFor="gstimg" className="gst-warrper">
                      <div className="text-center sub-pan-img">
                        <div className="py-1">
                          <i className="fa fa-arrow-up-from-bracket fa-lg"></i>
                        </div>
                        <div className="text-uppercase px-3 py-1">
                          Upload GST Certificate
                        </div>
                      </div>
                    </label>
                    {creditial.gstimg &&
                      creditial.gstimg.map((image, index) => (
                        <div key={index} className="uploaded-div-gst">
                          <span>{image.name}</span>{" "}
                          <button
                            className="uploaded-btn-gst"
                            onClick={() => removeImage("gstimg", index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                  </div>
                  <p className="text-sm text-red-500 absolute">
                    {errors.gstimg?.message}
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
                        {...register("isgst5", {
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
                    <div className="flex flex-cloumn gap-3">
                      <input
                        type="radio"
                        name="isgst5"
                        id="no"
                        value="No"
                        {...register("isgst5", {
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
                    <p className="text-sm text-red-500 absolute">
                      {errors.isgst5?.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* third part */}
              <div className="add-menu-first rounded-lg">
                <div className="px-3 pb-3">
                  <div className="text-2xl font-semibold">
                    FSSAI Certificate
                  </div>
                  <div className="text-sm">
                    This is required to comply regulations on food safety
                  </div>
                </div>
                <div className="px-3 pb-4">
                  <label htmlFor="fssainumber" className="res-label-text">
                    FSSAI Certificate Number :
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="text"
                    id="fssainumber"
                    name="fssainumber"
                    className="res-input-field"
                    value={creditial.fssainumber}
                    {...register("fssainumber", {
                      required: "FSSAI certificate number is required",
                      pattern: {
                        value: /^[0-9A-Z]{14}$/,
                        message: "FSSAI certificate number is not valid",
                      },
                      maxLength: {
                        value: 14,
                        message:
                          "Max 14 characters for FSSAI certificate number",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.fssainumber?.message}
                  </p>
                </div>
                <div className="px-3 pb-4">
                  <div className="fssai-img">
                    <input
                      type="file"
                      id="fssaiimg"
                      name="fssaiimg"
                      accept=".jpg, .png"
                      {...register("fssaiimg", {
                        required: "FSSAI certificate is required",
                      })}
                      onChange={onChange}
                    />

                    <label htmlFor="fssaiimg" className="fssai-warrper">
                      <div className="text-center sub-fssai-img">
                        <div className="py-1">
                          <i className="fa fa-arrow-up-from-bracket fa-lg"></i>
                        </div>
                        <div className="text-uppercase px-3 py-1">
                          Upload FSSAI Certificate
                        </div>
                      </div>
                    </label>

                    {creditial.fssaiimg &&
                      creditial.fssaiimg.map((image, index) => (
                        <div key={index} className="uploaded-div-fssai">
                          <span>{image.name}</span>
                          <button
                            className="uploaded-btn-fssai"
                            onClick={() => removeImage("fssaiimg", index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                  </div>
                  <p className="text-sm text-red-500 absolute">
                    {errors.fssaiimg?.message}
                  </p>
                </div>
              </div>

              {/* forth part */}
              <div className="add-menu-first rounded-lg">
                <div className="px-3 pb-3">
                  <div className="text-2xl font-semibold">Bank details</div>
                  <div className="text-sm">
                    Let us know where to deposit your money
                  </div>
                </div>
                <div className="flex flex-column">
                  <div className="w-1/2 px-3 pb-4">
                    <label htmlFor="bankaccnumber" className="res-label-text">
                      Bank Account Number:
                      <span className="text-red-600 text-lg"> *</span>
                    </label>
                    <input
                      type="text"
                      id="bankaccnumber"
                      name="bankaccnumber"
                      className="res-input-field"
                      value={creditial.bankaccnumber}
                      {...register("bankaccnumber", {
                        required: "Bank account number is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message:
                            "Bank account number should only contain digits",
                        },
                        minLength: {
                          value: 9,
                          message: "Min 9 digits for Bank account number",
                        },
                        maxLength: {
                          value: 18,
                          message: "Max 18 digits for Bank account number",
                        },
                      })}
                      onChange={onChange}
                      autoComplete="off"
                    />
                    <p className="text-sm text-red-500 absolute">
                      {errors.bankaccnumber?.message}
                    </p>
                  </div>
                  <div className="w-1/2 px-3 pb-4">
                    <label
                      htmlFor="reenterbankaccnumber"
                      className="res-label-text"
                    >
                      Re-enter Account Number:
                      <span className="text-red-600 text-lg"> *</span>
                    </label>
                    <input
                      type="text"
                      id="reenterbankaccnumber"
                      name="reenterbankaccnumber"
                      className="res-input-field"
                      {...register("reenterbankaccnumber", {
                        validate: (value) =>
                          value === watch("bankaccnumber") ||
                          "Account numbers do not match",
                      })}
                      autoComplete="off"
                    />
                    <p className="text-sm text-red-500 absolute">
                      {errors.reenterbankaccnumber?.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-column">
                  <div className="w-1/2 px-3 py-3">
                    <select
                      id="bankacctype"
                      name="bankacctype"
                      value={creditial.bankacctype}
                      className="p-2 mt-4 border-2 border-gray-300 rounded w-full"
                      {...register("bankacctype", {
                        required: "Type of account is required",
                      })}
                      onChange={onChange}
                    >
                      <option value="">Select account type</option>
                      <option className="m-4" value="Saving">
                        Saving
                      </option>
                      <option className="m-4" value="Current">
                        Current
                      </option>
                    </select>
                    <p className="text-sm text-red-500 absolute">
                      {errors.bankacctype?.message}
                    </p>
                  </div>

                  <div className="w-1/2 px-3 pb-4">
                    <label htmlFor="bankifsccode" className="res-label-text">
                      Bank IFSC Code :
                      <span className="text-red-600 text-lg"> *</span>
                    </label>
                    <input
                      type="text"
                      id="bankifsccode"
                      name="bankifsccode"
                      className="res-input-field"
                      value={creditial.bankifsccode}
                      {...register("bankifsccode", {
                        required: "Bank IFSC code is required",
                        pattern: {
                          value: /^[A-Z]{4}[0][A-Z0-9]{6}$/,
                          message: "Bank IFSC code is not valid",
                        },
                        maxLength: {
                          value: 11,
                          message: "Max 11 characters for Bank IFSC code",
                        },
                      })}
                      onChange={onChange}
                      autoComplete="false"
                    />
                    <p className="text-sm text-red-500 absolute">
                      {errors.bankifsccode?.message}
                    </p>
                  </div>
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
