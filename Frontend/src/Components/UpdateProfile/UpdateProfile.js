import React, { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdateProfile.css";
import { cloudinary_api_key } from "../Data/Api";
import axios from "axios";

const UpdateProfile = () => {
  const host = "http://localhost:5000";

  const user = JSON.parse(localStorage.getItem("user"));

  const DEFAULT_IMAGE =
    "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

  const defaultImage = DEFAULT_IMAGE;

  const [creditial, setCreditial] = useState({
    profileImage: defaultImage,
    firstname: "",
    lastname: "",
    email: user?.email ? user?.email : "",
    phone: user?.phone ? user?.phone : "",
    address: user?.address ? user?.address : "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "UpdateProfile | Foodly";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const goBack = () => {
    navigate(`/dashboard`);
  };

  const profilePhotoWrapper = useRef(null);

  const displayProfilePhoto = (file) => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (profilePhotoWrapper.current) {
          profilePhotoWrapper.current.style.backgroundImage = `url(${reader.result})`;
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const setProfilePhoto = useMemo(
    () => ({
      backgroundImage:
        creditial.profileImage !== ""
          ? `url(${creditial.profileImage})`
          : `url(${defaultImage})`,
    }),
    [creditial.profileImage]
  );

  /* Upload Profile photo to cloudinary */
  const uploadImageToCloudinary = async (file, preset) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      const response = await axios.post(cloudinary_api_key, formData);

      const uploadedImgData = {
        statusText: response.statusText,
        profileImage: response.data.secure_url,
        publicId: response.data.public_id,
      };

      return uploadedImgData;
    } catch (error) {
      if (error.response.status === 400) {
        toast(toast, "Image size too large", "error");
      } else {
        toast(toast, "Something went wrong. Try Again", "error");
      }
      console.log("Error in uploading profile photo to cloudinary : ", error);
      return null;
    }
  };

  const clickHandler = async (e) => {
    
    if (
      // creditial.profileImage !== "" &&
      creditial.firstname !== "" &&
      creditial.lastname !== "" &&
      creditial.email !== "" &&
      creditial.phone !== "" &&
      creditial.address !== ""
    ) {
      // Api call
      const response = await fetch(
        `${host}/api/auth/dashboard/updateProfile/${user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
          body: JSON.stringify({
            profileImage: creditial.profileImage,
            username: `${creditial.firstname} ${creditial.lastname}`,
            email: creditial.email,
            phone: creditial.phone,
            address: creditial.address,
          }),
        }
      );

      // parses JSON response into native JavaScript objects
      const json = await response.json();

      if (json) {
        toast.success("Your Profile Updated successfully!!", {
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
        toast.error("Error in Update Profile", {
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
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-70">
            <form
              onSubmit={handleSubmit(clickHandler)}
              className="flex flex-col space-y-4"
            >
              {/* <--- User Profile photo ---> */}
              <div className="user-profile-photo-container">
                <input
                  type="file"
                  id="profile-photo"
                  name="profileImage"
                  accept="image/*"
                  onChange={(e) => {
                    setCreditial("profileImageFile", e.target.files[0]);
                    displayProfilePhoto(e.target.files[0]);
                  }}
                />
                <label
                  htmlFor="profile-photo"
                  className="profile-photo-wrapper"
                  style={setProfilePhoto}
                >
                  <div className="upload-img-div text-center">
                    <div className="mb-2">
                      <i className="fa fa-camera fa-2x"></i>
                    </div>
                    <div className="text-uppercase">
                      Update
                      <br />
                      Profile Photo
                    </div>
                  </div>
                </label>
              </div>

              {/* <--- User First Name ---> */}
              <div>
                <label htmlFor="" className="label-text">
                  First Name : <span className="text-red-600 text-lg">*</span>
                </label>
                <input
                  type="text"
                  value={creditial.firstname}
                  {...register("firstname", {
                    required: "Your Firstname is required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Only alphabets are allowed in Firstname",
                    },
                  })}
                  onChange={onChange}
                  autoComplete="false"
                  className="input-field"
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.firstname?.message}
                </p>
              </div>
              {/* <--- User Last Name ---> */}
              <div>
                <label htmlFor="" className="label-text">
                  Last Name : <span className="text-red-600 text-lg">*</span>
                </label>
                <input
                  type="text"
                  value={creditial.lastname}
                  {...register("lastname", {
                    required: "Your Lastname is required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Only alphabets are allowed in Lastname",
                    },
                  })}
                  onChange={onChange}
                  autoComplete="false"
                  className="input-field"
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.lastname?.message}
                </p>
              </div>
              {/* <--- User Email Address ---> */}
              <div className="mt-5">
                <label htmlFor="" className="label-text">
                  Email Address :{" "}
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
                  readOnly={user ? true : false}
                  className="input-field"
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.email?.message}
                </p>
              </div>
              {/* <--- User Contact Number ---> */}
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
              {/* User Address */}
              <div className="mt-5">
                <label htmlFor="" className="label-text">
                  Address : <span className="text-red-600 text-lg"> *</span>
                </label>
                <textarea
                  rows="3"
                  value={creditial.address}
                  {...register("address", {
                    required: "Address is required",
                  })}
                  onChange={onChange}
                  autoComplete="false"
                  className="input-field"
                ></textarea>
                <p className="text-sm text-red-500 absolute">
                  {errors.address?.message}
                </p>
              </div>

              <div className="flex justify-center drop-shadow-xl pt-5">
                <div className="inline-block border-2 border-orange-400">
                  <button
                    onClick={goBack}
                    className="md:ml-8 text-md font-semibold md:my-0 bg-white-900 px-4 py-3 rounded-md shadow-md hover:shadow-lg"
                  >
                    Go Back
                  </button>
                </div>
                <div className="inline-block mr-4">
                  <button className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 px-6 py-3 rounded-md shadow-md hover:shadow-lg">
                    Save
                  </button>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
