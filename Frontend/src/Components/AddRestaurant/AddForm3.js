import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, fa3 } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./AddForm.css";

function AddForm3() {
  const host = "http://localhost:5000";

  const restaurant = JSON.parse(localStorage.getItem("restaurant"));

  const [creditial, setCreditial] = useState({
    menuimg: restaurant?.menuimg ? restaurant?.menuimg : [],
    resimg: restaurant?.resimg ? restaurant?.resimg : [],
    foodimg: restaurant?.foodimg ? restaurant?.foodimg : [],
  });

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  // const closeModal1 = () => {
  //   setShowModal(false);
  // };

  const showStep2 = restaurant?.categorytype !== "Dine-in only";

  const goAddFrom4 = () => {
    navigate(`/addRestaurant/addForm/4?resId=${restaurant?._id}`);
  };

  useEffect(() => {
    document.title = "Add Form | Foodly";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

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

  const backFrom = () => {
    toast.info("Please click on Back to go to the back page", {
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

  const clickHandler = async (e) => {
    const menuImageUrls = await Promise.all(
      creditial.menuimg.map((file) =>
        uploadImageToCloudinary(file, "menu_photo")
      )
    );

    const resImageUrls = await Promise.all(
      creditial.resimg.map((file) => uploadImageToCloudinary(file, "res_photo"))
    );

    const foodImageUrls = await Promise.all(
      creditial.foodimg.map((file) =>
        uploadImageToCloudinary(file, "food_photo")
      )
    );

    if (menuImageUrls !== "" && resImageUrls !== "" && foodImageUrls !== "") {
      // API call
      const response = await fetch(
        `${host}/api/res/addRestaurant/addFrom/3/${restaurant?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: restaurant?._id,
            menuimg: menuImageUrls,
            resimg: resImageUrls,
            foodimg: foodImageUrls,
          }),
        }
      );

      const json = await response?.json();

      if (json) {
        localStorage.setItem(
          "restaurant",
          JSON.stringify(json.updatedRestaurant)
        );

        toast.success(
          "Restaurant, Menu & Food images Submitted Successfully.",
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

        setTimeout(() => {
          openModal();
        }, 2000);
      } else {
        toast.error("Error in Restaurant, Menu & Food images Submission", {
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
    const name = e.target.name;
    const files = e.target.files;
    setCreditial((prevState) => ({
      ...prevState,
      [name]: [...prevState[name], ...files],
    }));
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
            <button className="py-2" onClick={backFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-green-400 rounded-full px-2 pt-2 pb-1 my-4">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-6 h-6" />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Restaurant Information</div>
                  <div className="add-left-sub-text">
                    Restaurant name, address, contact no., owner details
                  </div>
                </div>
              </div>
            </button>
            <button className="py-2" onClick={backFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-green-400 rounded-full px-2 pt-2 pb-1 my-4">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-6 h-6" />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Restaurant Type & Time</div>
                  <div className="add-left-sub-text">
                    Establishment & cuisine type, opening hours
                  </div>
                </div>
              </div>
            </button>
            <button className="pt-2" onClick={currFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-orange-400 rounded-full p-2 my-4">
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
          <div className="add-final-part">
            <div className="text-5xl font-bold text-center">Upload images</div>
            <form onSubmit={handleSubmit(clickHandler)}>
              {/* First part */}
              <div className="add-menu-first rounded-lg">
                <div className="text-2xl font-semibold">Menu images</div>
                <div className="text-sm">
                  Your menu will be directly visible to customers on Foodly
                </div>

                <div className="menu-img border-2 border-gray-900">
                  <input
                    type="file"
                    id="menuimg"
                    name="menuimg"
                    accept="image/*"
                    {...register("menuimg", {
                      required: "Restaurant Menu is required",
                    })}
                    onChange={onChange}
                  />

                  <label htmlFor="menuimg" className="menu-warrper">
                    <div className="text-center sub-menu-img ">
                      <div className="mb-2">
                        <i className="fa fa-camera fa-2x"></i>
                      </div>
                      <div className="text-uppercase">Add Photos</div>
                    </div>
                  </label>

                  {creditial.menuimg &&
                    creditial.menuimg.map((image, index) => (
                      <div key={index} className="uploaded-div">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                          className="uploaded-image"
                        />
                        <button
                          className="uploaded-btn"
                          onClick={() => removeImage("menuimg", index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>

                <p className="text-sm text-red-500 absolute">
                  {errors.menuimg?.message}
                </p>
              </div>

              {/* Second part */}
              <div className="add-res-first rounded-lg">
                <div className="text-2xl font-semibold">Restaurant images</div>
                <div className="text-sm">
                  Please upload atleast one facade shot (picture of the
                  restaurant front)
                </div>

                <div className="res-img">
                  <input
                    type="file"
                    id="resimg"
                    name="resimg"
                    accept="image/*"
                    {...register("resimg", {
                      required: "Restaurant image is required",
                    })}
                    onChange={onChange}
                  />

                  <label htmlFor="resimg" className="res-warrper">
                    <div className="text-center sub-res-img">
                      <div className="mb-2">
                        <i className="fa fa-camera fa-2x"></i>
                      </div>
                      <div className="text-uppercase">Add Photos</div>
                    </div>
                  </label>

                  {creditial.resimg &&
                    creditial.resimg.map((image, index) => (
                      <div key={index} className="uploaded-div">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                          className="uploaded-image"
                        />
                        <button
                          className="uploaded-btn"
                          onClick={() => removeImage("resimg", index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>

                <p className="text-sm text-red-500 absolute">
                  {errors.resimg?.message}
                </p>
              </div>

              {/* Third part */}
              <div className="add-food-first rounded-lg">
                <div className="text-2xl font-semibold">Food images</div>
                <div className="text-sm">
                  Please do not put images of raw ingredients
                </div>

                <div className="food-img">
                  <input
                    type="file"
                    id="foodimg"
                    name="foodimg"
                    accept="image/*"
                    {...register("foodimg", {
                      required: "Restaurant's Food image is required",
                    })}
                    onChange={onChange}
                  />

                  <label htmlFor="foodimg" className="food-warrper">
                    <div className="text-center sub-food-img">
                      <div className="mb-2">
                        <i className="fa fa-camera fa-2x"></i>
                      </div>
                      <div className="text-uppercase">Add Photos</div>
                    </div>
                  </label>

                  {creditial.foodimg &&
                    creditial.foodimg.map((image, index) => (
                      <div key={index} className="uploaded-div">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                          className="uploaded-image"
                        />
                        <button
                          className="uploaded-btn"
                          onClick={() => removeImage("foodimg", index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>

                <p className="text-sm text-red-500 absolute">
                  {errors.foodimg?.message}
                </p>
              </div>

              {/* footer */}
              <div className="add-footer">
                <div className="md:flex md:p-0 absolute md:static w-full md:w-auto transition-all duration-500 ease-in align-middle justify-center items-center gap-20">
                  <div className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                    <Link
                      className="text-white-900 duration-500"
                      to="/addRestaurant/addForm/2"
                    >
                      Back
                    </Link>
                  </div>

                  <div className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 hover:bg-orange-500 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                    <button className="text-gray-800 duration-500">Next</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed rounded-lg w-auto inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="w-auto h-auto py-5 px-16 bg-white rounded text-center flex flex-col items-center justify-center align-center">
            <img
              src={require(`./../../assets/Success.webp`)}
              className="h-32 w-32"
              alt="Success Icon"
            />
            <div className="my-2">STEP - 1</div>
            <div className="text-2xl font-bold my-2">
              Restaurant listing details submitted
            </div>
            <div className="text-xl font-md my-2">
              Our team will verify the details and update once <br /> your page
              is live on Foodly!
            </div>
            {showStep2 && (
              <button
                onClick={goAddFrom4}
                className="text-white font-bold bg-orange-400 hover:bg-orange-500 py-3 px-4 my-2 rounded-md shadow-md hover:shadow-lg"
              >
                Step 2 - Register for online ordering
              </button>
            )}
            <div className="bg-gray-100 hover:bg-gray-200 py-3 px-4 my-2 rounded-md shadow-md hover:shadow-lg">
              Done for now
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddForm3;
