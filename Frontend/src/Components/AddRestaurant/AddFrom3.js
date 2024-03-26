import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, fa3 } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddForm.css";

function AddForm3() {
  const host = "http://localhost:5000";

  const restaurant = JSON.parse(localStorage.getItem("restaurant"));

  const [creditial, setCreditial] = useState({
    menuimg: "",
    resimg: "",
    foodimg: "",
  });

  useEffect(() => {
    document.title = "Add Form | Foodly";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const clickHandler = async (e) => {
    // if (menuimg.length > 0 && resimg.length > 0 && foodimg.length > 0) {
    //   // API call
    //   const response = await fetch(
    //     `${host}/api/res/addRestaurant/addFrom/3/${restaurant?._id}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         _id: restaurant?._id,
    //         menuimg: menuimg,
    //         resimg: resimg,
    //         foodimg: foodimg,
    //       }),
    //     }
    //   );
    //   const json = await response?.json();
    //   if (json) {
    //     toast.success(
    //       "Restaurant, Menu & Food images Submitted Successfully.",
    //       {
    //         position: "top-right",
    //         autoClose: 1500,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         rtl: false,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       }
    //     );
    //     setTimeout(() => {
    //       localStorage.removeItem("restaurant");
    //       navigate(`/dashboard`);
    //     }, 2000);
    //   } else {
    //     toast.error("Error in Restaurant, Menu & Food images Submission", {
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
    //   }
    // } else {
    //   toast.error("Please fill all the required fields...", {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     rtl: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
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
              {/* <Link to="/addRestaurant/addForm/1"> */}
              <div className="flex flex-column">
                <div className="w-1/6 border-2 border-gray-900 rounded-full pt-2 pb-1 py-1 my-4">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-6 h-6" />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Restaurant Information</div>
                  <div className="add-left-sub-text">
                    Restaurant name, address, contact no., owner details
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </button>
            <button className="py-2 border-2 border-gray-900">
              {/* <Link to="/addRestaurant/addForm/2"> */}
              <div className="flex flex-column">
                <div className="w-1/6 border-2 border-gray-900 rounded-full pt-2 pb-1 py-1 my-4">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-6 h-6" />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Restaurant Type & Time</div>
                  <div className="add-left-sub-text">
                    Establishment & cuisine type, opening hours
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </button>
            <button className="pt-2 pb-1 border-2 border-gray-900">
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
            </button>
          </div>
          <div className="add-left-mid py-4 px-4 rounded-lg">
            <div className="font-semibold text-base">
              Your Restaurant Id : {restaurant?._id}
            </div>
          </div>
          <div className="add-left-second p-4 rounded-lg">
            <span className="font-bold text-lg">
              2. Register for Online ordering
            </span>
          </div>
        </div>
        <div className="add-right">
          <div className="add-third-part">
            <div className="text-5xl font-bold text-center">Upload images</div>
            <form onSubmit={handleSubmit(clickHandler)}>
              {/* First part */}
              <div className="add-right-first p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">Menu images</div>
                  <div className="text-sm">
                    Your menu will be directly visible to customers on Zomato
                  </div>
                </div>
                <div className="px-3 pt-3 pb-6">
                  <input
                    rows="6"
                    type="file"
                    id="menuimg"
                    name="menuimg"
                    className="res-input-field"
                    // value={creditial.menuimg}
                    {...register("menuimg", {
                      required: "Restaurant Menu is required",
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.menuimg?.message}
                  </p>
                </div>
              </div>

              {/* Second part */}
              <div className="add-right-first p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">
                    Restaurant images
                  </div>
                  <div className="text-sm">
                    Please upload atleast one facade shot (picture of the
                    restaurant front)
                  </div>
                </div>
                <div className="px-3 pt-3 pb-6">
                  <input
                    type="file"
                    id="resimg"
                    name="resimg"
                    className="res-input-field"
                    value={creditial.resimg}
                    {...register("resimg", {
                      required: "Restaurant image is required",
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.resimg?.message}
                  </p>
                </div>
              </div>

              {/* Third part */}
              <div className="add-right-first p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">Food images</div>
                  <div className="text-sm">
                    Please do not put images of raw ingredients
                  </div>
                </div>
                <div className="px-3 pt-3 pb-6">
                  <input
                    type="file"
                    id="foodimg"
                    name="foodimg"
                    className="res-input-field"
                    value={creditial.foodimg}
                    {...register("foodimg", {
                      required: "Restaurant's Food image is required",
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {errors.foodimg?.message}
                  </p>
                </div>
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
    </div>
  );
}

export default AddForm3;
