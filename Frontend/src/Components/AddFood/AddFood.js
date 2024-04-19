import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddFood.css";
import axios from "axios";

function AddFood() {
  const params = useParams();
  var resId = params.id;

  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Food | Foodly";
  }, []);

  // const [food, setFood] = useState({});

  const [selectedFoodType, setSelectedFoodType] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState([]);

  useEffect(() => {
    // const storeFoodType = food?.foodtype;
    // if (storeFoodType) {
    //   setSelectedFoodType(storeFoodType);
    // }
    // // const storeServiceType = food?.servicetype;
    // if (storeServiceType) {
    //   setSelectedServiceType(storeServiceType);
    // }
  });

  const handleFoodTypeChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedFoodType([...selectedFoodType, value]);
    } else {
      setSelectedFoodType(selectedFoodType.filter((type) => type !== value));
    }
  };

  const handleServiceTypeChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedServiceType([...selectedServiceType, value]);
    } else {
      setSelectedServiceType(
        selectedServiceType.filter((type) => type !== value)
      );
    }
  };

  const [creditial, setCreditial] = useState({
    foodname: "",
    foodcategory: "",
    foodprice: "",
    fooddetails: "",
    menufood: [],
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
    const menufoodUrls = await Promise.all(
      creditial.menufood.map((file) =>
        uploadImageToCloudinary(file, "menufood_img")
      )
    );

    const selectedFoodTypes = []; // Array to store selected types

    // Get all checkboxes with name "restype"
    const typecheckboxes = document.querySelectorAll(
      'input[name="foodtype"]:checked'
    );

    // Iterate over each checked checkbox and push its value to selectedFoodTypes array
    typecheckboxes.forEach((checkbox) => {
      selectedFoodTypes.push(checkbox.value);
    });

    const selectedServiceTypes = []; // Array to store selected types

    // Get all checkboxes with name "restype"
    const servicetypecheckboxes = document.querySelectorAll(
      'input[name="servicetype"]:checked'
    );

    // Iterate over each checked checkbox and push its value to selectedServiceTypes array
    servicetypecheckboxes.forEach((checkbox) => {
      selectedServiceTypes.push(checkbox.value);
    });

    // Check if all required fields are filled
    if (
      resId !== "" &&
      creditial.foodname !== "" &&
      creditial.foodcategory !== "" &&
      selectedFoodTypes.length > 0 &&
      selectedServiceTypes.length > 0 &&
      creditial.foodprice !== "" &&
      creditial.fooddetails !== "" &&
      menufoodUrls !== ""
    ) {
      // If restaurant does not exist, create a new entry
      const response = await fetch(`${host}/api/food/addFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resId: resId,
          foodname: creditial.foodname,
          foodcategory: creditial.foodcategory,
          foodtype: selectedFoodTypes,
          servicetype: selectedServiceTypes,
          foodprice: creditial.foodprice,
          fooddetails: creditial.fooddetails,
          foodimg: menufoodUrls,
        }),
      });

      const json = await response.json();

      if (json) {
        toast.success("New Food added Successfully.", {
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
        toast.error("Failed to added food item.", {
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
        <div className="add-food-right">
          <div className="text-5xl font-bold text-center">Food Information</div>
          <form onSubmit={handleSubmit(clickHandler)}>
            {/* first part */}
            <div className="add-menufood-first my-3 mx-2 p-4 rounded-lg">
              {/* Food name */}
              <div className="px-3 py-1">
                <div className="mb-3">
                  <label htmlFor="foodname" className="text-xl font-semibold">
                    Food Name
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="text"
                    id="foodname"
                    name="foodname"
                    className="food-input-field"
                    value={creditial.foodname}
                    {...register("foodname", {
                      required: "Food Name is required",
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500">
                    {errors.foodname?.message}
                  </p>
                </div>
              </div>

              {/* Food categories */}
              <div className="px-3 py-1">
                <div className="w-1/2 mb-3">
                  <label
                    htmlFor="foodcategory"
                    className="text-xl font-semibold"
                  >
                    Food Category
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <select
                    id="foodcategory"
                    name="foodcategory"
                    value={creditial.foodcategory}
                    className="p-2 mt-4 border-2 border-gray-300 rounded w-full"
                    {...register("foodcategory", {
                      required: "Category of food is required",
                    })}
                    onChange={onChange}
                  >
                    <option value="">Select food category</option>
                    <option className="m-4" value="Bakery">
                      Bakery
                    </option>
                    <option className="m-4" value="Fast Food">
                      Fast Food
                    </option>
                    <option className="m-4" value="Coffee & tea">
                      Coffee & tea
                    </option>
                    <option className="m-4" value="Gujrati">
                      Gujrati
                    </option>
                    <option className="m-4" value="Hyderabadi">
                      Hyderabadi
                    </option>
                    <option className="m-4" value="Italian">
                      Italian
                    </option>
                    <option className="m-4" value="Maharashtrian">
                      Maharashtrian
                    </option>
                    <option className="m-4" value="North Indian">
                      North Indian
                    </option>
                    <option className="m-4" value="Panjabi">
                      Panjabi
                    </option>
                    <option className="m-4" value="Salad">
                      Salad
                    </option>
                    <option className="m-4" value="Seafood">
                      Seafood
                    </option>
                    <option className="m-4" value="Bar Food">
                      Bar Food
                    </option>
                    <option className="m-4" value="Chinese">
                      Chinese
                    </option>
                    <option className="m-4" value="Healthy Food">
                      Healthy Food
                    </option>
                    <option className="m-4" value="Ice Cream">
                      Ice Cream
                    </option>
                    <option className="m-4" value="Japanese">
                      Japanese
                    </option>
                    <option className="m-4" value="Mexican">
                      Mexican
                    </option>
                    <option className="m-4" value="Paan">
                      Paan
                    </option>
                    <option className="m-4" value="Rajasthani">
                      Rajasthani
                    </option>
                    <option className="m-4" value="Street Food">
                      Street Food
                    </option>
                    <option className="m-4" value="Beverages">
                      Beverages
                    </option>
                    <option className="m-4" value="Cafe Food">
                      Cafe Food
                    </option>
                    <option className="m-4" value="Indian">
                      Indian
                    </option>
                    <option className="m-4" value="Juices">
                      Juices
                    </option>
                    <option className="m-4" value="South Indian">
                      South Indian
                    </option>
                  </select>
                  <p className="text-sm text-red-500">
                    {errors.foodcategory?.message}
                  </p>
                </div>
              </div>

              {/* Food types */}
              <div className="px-3 py-1">
                <div className="w-2/3 mb-3">
                  <label htmlFor="foodtype" className="text-xl font-semibold">
                    Food type
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <div className="pt-4 flex flex-row">
                    <div className="w-1/3">
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Egg"
                          name="foodtype"
                          value="Egg"
                          checked={selectedFoodType.includes("Egg")}
                          onChange={handleFoodTypeChange}
                        />
                        <label htmlFor="Egg">Egg</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Non-veg"
                          name="foodtype"
                          value="Non-veg"
                          checked={selectedFoodType.includes("Non-veg")}
                          onChange={handleFoodTypeChange}
                        />
                        <label htmlFor="Non-veg">Non-veg</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Veg"
                          name="foodtype"
                          value="Veg"
                          checked={selectedFoodType.includes("Veg")}
                          onChange={handleFoodTypeChange}
                        />
                        <label htmlFor="Veg">Veg</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service types */}
              <div className="px-3 py-1">
                <div className="w-2/3 mb-3">
                  <label
                    htmlFor="servicetype"
                    className="text-xl font-semibold"
                  >
                    Service type
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <div className="pt-4 flex flex-row">
                    <div className="w-1/3">
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Delivery"
                          name="servicetype"
                          value="Delivery"
                          checked={selectedServiceType.includes("Delivery")}
                          onChange={handleServiceTypeChange}
                        />
                        <label htmlFor="Delivery">Delivery</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Dine"
                          name="servicetype"
                          value="Dine"
                          checked={selectedServiceType.includes("Dine")}
                          onChange={handleServiceTypeChange}
                        />
                        <label htmlFor="Dine">Dine</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Takeaway"
                          name="servicetype"
                          value="Takeaway"
                          checked={selectedServiceType.includes("Takeaway")}
                          onChange={handleServiceTypeChange}
                        />
                        <label htmlFor="Takeaway">Takeaway</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Food pricing */}
              <div className="px-3 py-1">
                <div className="mb-3">
                  <label htmlFor="foodprice" className="text-xl font-semibold">
                    Food Pricing
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type=""
                    id="foodprice"
                    name="foodprice"
                    className="food-input-field"
                    value={creditial.foodprice}
                    {...register("foodprice", {
                      required: "Food Price is required",
                      min: {
                        value: 0.01,
                        message: "Price must be greater than zero",
                      },
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Invalid price format",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500">
                    {errors.foodprice?.message}
                  </p>
                </div>
              </div>

              {/* Food details */}
              <div className="px-3 py-1">
                <label htmlFor="fooddetails" className="text-xl font-semibold">
                  Food Details :<span className="text-red-600 text-lg"> *</span>
                </label>
                <textarea
                  rows="4"
                  type="textarea"
                  id="fooddetails"
                  name="fooddetails"
                  className="res-input-field"
                  value={creditial.fooddetails}
                  {...register("fooddetails", {
                    required: "Food details is required",
                  })}
                  onChange={onChange}
                  autoComplete="false"
                />
                <p className="text-sm text-red-500">
                  {errors.fooddetails?.message}
                </p>
              </div>

              {/* food images */}
              <div className="px-3 py-1">
                <div className="text-2xl font-semibold">Food images</div>
                <div className="text-sm">
                  Your food will be directly visible to customers on Foodly
                </div>

                <div className="food-img">
                  <input
                    type="file"
                    id="menufood"
                    name="menufood"
                    accept="image/*"
                    {...register("menufood", {
                      required: "Food Images are required",
                    })}
                    onChange={onChange}
                  />

                  <label htmlFor="menufood" className="menufood-warrper">
                    <div className="text-center sub-menufood-img">
                      <div className="mb-2">
                        <i className="fa fa-camera fa-2x"></i>
                      </div>
                      <div className="text-uppercase">Add Photos</div>
                    </div>
                  </label>

                  {creditial.menufood &&
                    creditial.menufood.map((image, index) => (
                      <div key={index} className="uploaded-div">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                          className="uploaded-image"
                        />
                        <button
                          className="uploaded-btn"
                          onClick={() => removeImage("menufood", index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>

                <p className="text-sm text-red-500">
                  {errors.menufood?.message}
                </p>
              </div>

              <div className="px-3 py-1 flex justify-center drop-shadow-xl">
                <button className="w-full text-black font-medium btn-txt bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFood;
