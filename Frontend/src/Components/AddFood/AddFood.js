import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddFood.css";
import axios from "axios";

function AddFood() {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const restaurant = JSON.parse(localStorage.getItem("restaurant"));

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Food | Foodly";
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const [creditial, setCreditial] = useState({
    foodname: "",
    foodtype: "",
    foodcategory: "",
    foodprice: "",
    fooddetails: "",
    foodphoto: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    const foodPhotoUrls = await Promise.all(
      creditial.foodphoto.map((file) =>
        uploadImageToCloudinary(file, "menufood_img")
      )
    );

    // Check if all required fields are filled
    if (
      creditial.foodname !== "" &&
      creditial.foodtype !== "" &&
      creditial.foodcategory !== "" &&
      creditial.servicetype !== "" &&
      creditial.foodprice !== "" &&
      creditial.fooddetails !== "" &&
      foodPhotoUrls !== ""
    ) {
      // If restaurant does not exist, create a new entry
      const response = await fetch(`${host}/api/food/addFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodname: creditial.foodname,
          foodtype: creditial.foodtype,
          foodcategory: creditial.foodcategory,
          servicetype: creditial.servicetype,
          foodprice: creditial.foodprice,
          fooddetails: creditial.fooddetails,
          foodphoto: foodPhotoUrls,
        }),
      });

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
    <div className="add-food-page">
      <div className="add-food-content">
        <div className="add-food-right border-2 border-gray-800">
          <div className="text-5xl font-bold text-center">Food Information</div>
          <form onSubmit={handleSubmit(clickHandler)}>
            {/* first part */}
            <div className="add-right-first p-4 rounded-lg border-2 border-gray-800">
              <div className="p-3">
                <div className="text-2xl font-semibold">Food Details</div>
                <div className="text-sm">Name, Images and Price</div>
              </div>

              <div className="px-3 pb-4">
                <label htmlFor="foodname" className="res-label-text">
                  Food Name
                  <span className="text-red-600 text-lg"> *</span>
                </label>
                <input
                  type="text"
                  id="foodname"
                  name="foodname"
                  className="res-input-field"
                  value={creditial.foodname}
                  {...register("foodname", {
                    required: "Food Name is required",
                  })}
                  onChange={onChange}
                  autoComplete="false"
                />
                <p className="text-sm text-red-500 absolute">
                  {errors.foodname?.message}
                </p>
              </div>
            </div>

            {/* second */}
            <div className="add-food-first rounded-lg border-2 border-gray-800">
              <div className="text-2xl font-semibold">Food images</div>
              <div className="text-sm">
                Your food will be directly visible to customers on Foodly
              </div>

              <div className="food-img border-2 border-gray-900">
                <input
                  type="file"
                  id="menufoodimg"
                  name="menufoodimg"
                  accept="image/*"
                  {...register("menufoodimg", {
                    required: "Restaurant Food is required",
                  })}
                  onChange={onChange}
                />

                <label htmlFor="menufoodimg" className="menufood-warrper">
                  <div className="text-center sub-menufood-img">
                    <div className="mb-2">
                      <i className="fa fa-camera fa-2x"></i>
                    </div>
                    <div className="text-uppercase">Add Photos</div>
                  </div>
                </label>

                {creditial.menufoodimg &&
                  creditial.menufoodimg.map((image, index) => (
                    <div key={index} className="uploaded-div">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        className="uploaded-image"
                      />
                      <button
                        className="uploaded-btn"
                        onClick={() => removeImage("menufoodimg", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>

              <p className="text-sm text-red-500 absolute">
                {errors.menufoodimg?.message}
              </p>
            </div>

            <div className="m-8 text-md font-semibold md:my-0 bg-orange-400 hover:bg-orange-500 px-32 py-4 rounded-md shadow-md hover:shadow-lg">
              <button className="text-gray-800 duration-500 text-center">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFood;
