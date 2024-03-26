import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddForm.css";

function AddForm2() {
  const host = "http://localhost:5000";

  const restaurant = JSON.parse(localStorage.getItem("restaurant"));

  // State variables to hold the opening and closing time values
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  // Function to handle changes in opening time input
  const handleOpeningTimeChange = (e) => {
    setOpeningTime(e.target.value);
  };

  // Function to handle changes in closing time input
  const handleClosingTimeChange = (e) => {
    setClosingTime(e.target.value);
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

  const backFrom = () => {
    toast.info("You can not go to the back page", {
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

  const clickHandler = async (e) => {
    // Get all radio with name "rescategory"
    const rescategory = document.querySelector(
      'input[name="rescategory"]:checked'
    )?.value;

    const selectedTypes = []; // Array to store selected types

    // Get all checkboxes with name "restype"
    const typecheckboxes = document.querySelectorAll(
      'input[name="restype"]:checked'
    );

    // Iterate over each checked checkbox and push its value to selectedTypes array
    typecheckboxes.forEach((checkbox) => {
      selectedTypes.push(checkbox.value);
    });

    const selectedCuisineTypes = []; // Array to store selected types

    // Get all checkboxes with name "rescuisinetype"
    const typecuisinecheckboxes = document.querySelectorAll(
      'input[name="rescuisinetype"]:checked'
    );

    // Iterate over each checked checkbox and push its value to selectedCuisineTypes array
    typecuisinecheckboxes.forEach((checkbox) => {
      selectedCuisineTypes.push(checkbox.value);
    });

    const selectedDays = []; // Array to store selected types

    // Get all checkboxes with name "resdays"
    const dayscheckboxes = document.querySelectorAll(
      'input[name="resdays"]:checked'
    );

    // Iterate over each checked checkbox and push its value to selectedDays array
    dayscheckboxes.forEach((checkbox) => {
      selectedDays.push(checkbox.value);
    });

    if (
      rescategory !== "" &&
      selectedTypes.length > 0 &&
      selectedCuisineTypes.length > 0 &&
      openingTime !== "" &&
      closingTime !== "" &&
      selectedDays.length > 0
    ) {
      // API call
      const response = await fetch(
        `${host}/api/res/addRestaurant/addFrom/2/${restaurant?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: restaurant?._id,
            rescategory: rescategory,
            restypes: selectedTypes,
            rescuisinetype: selectedCuisineTypes,
            openingtime: openingTime,
            closingtime: closingTime,
            resdays: selectedDays,
          }),
        }
      );

      const json = await response?.json();
      console.log(json);

      if (json) {
        toast.success("Restaurant Type & Time Submitted Successfully.", {
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
          navigate(
            `/addRestaurant/addForm/3?resId=${json.updatedRestaurant._id}`
          );
        }, 2000);
      } else {
        toast.error("Error in Restaurant Type & Time Submission", {
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

  return (
    <div className="add-res-page">
      <div className="add-res-content">
        <div className="add-left">
          <div className="add-left-first py-4 px-4 rounded-lg">
            <div className="font-bold text-lg">
              1. Create your restaurant page
            </div>
            <hr />
            <button
              className="py-2 border-2 border-gray-900"
              onClick={backFrom}
            >
              {/* <Link to="/addRestaurant/addForm/1"> */}
              <div className="flex flex-column">
                <div className="w-1/6 border-2 border-gray-900 bg-green-00 rounded-full pt-2 pb-1 py-1 my-4">
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
            </button>
            <button
              className="pt-2 pb-1 border-2 border-gray-900"
              onClick={nextFrom}
            >
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
          <div className="add-second-part">
            <div className="text-5xl font-bold text-center">
              Restaurant Type & Timings
            </div>
            <form onSubmit={handleSubmit(clickHandler)}>
              {/* forth part */}
              <div className="add-right-forth p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">
                    Establishment type
                  </div>
                  <div className="text-sm">
                    Select most relevant category for your restaurant type
                  </div>
                </div>
                <div className="p-3">
                  <div className="p-2">
                    <div className="flex flex-cloumn gap-3">
                      <input
                        type="radio"
                        name="rescategory"
                        id="both"
                        value="Both, delivery and dine-in available"
                        {...register("rescategory", {
                          required: {
                            value: true,
                            message: "Restaurant type is required",
                          },
                        })}
                        defaultChecked
                      />
                      <label htmlFor="both" className="text-lg">
                        Both, delivery and dine-in available
                      </label>
                    </div>
                    <div className="ml-6 text-sm">
                      Select this option when you have a place for customers to
                      dine-in and also want to activate online ordering for your
                      restaurant
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex flex-cloumn gap-3">
                      <input
                        type="radio"
                        name="rescategory"
                        id="dine"
                        value="Dine-in only"
                        {...register("rescategory", {
                          required: {
                            value: true,
                            message: "Restaurant type is required",
                          },
                        })}
                      />
                      <label htmlFor="dine" className="text-lg">
                        Dine-in only
                      </label>
                    </div>
                    <div className="ml-6 text-sm">
                      Select when you don't want to register for online ordering
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex flex-cloumn gap-3">
                      <input
                        type="radio"
                        name="rescategory"
                        id="delivery"
                        value="Delivery only"
                        {...register("rescategory", {
                          required: {
                            value: true,
                            message: "Restaurant type is required",
                          },
                        })}
                      />
                      <label htmlFor="delivery" className="text-lg">
                        Delivery only
                      </label>
                    </div>
                    <div className="ml-6 text-sm">
                      Select when you don't have a facility for customers to
                      dine-in (like delivery kitchens)
                    </div>
                  </div>
                  <p className="text-sm text-red-500">
                    {errors.rescategory?.message}
                  </p>
                </div>
                <div className="p-3">
                  <div className="text-lg">
                    Select options which best describe your outlet
                  </div>
                  <div className="pt-4 flex flex-column">
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Bakery"
                          name="restype"
                          value="Bakery"
                        />
                        <label htmlFor="Bakery">Bakery</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Casual Dining"
                          name="restype"
                          value="Casual Dining"
                        />
                        <label htmlFor="Casual Dining">Casual Dining</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Quick Bites"
                          name="restype"
                          value="Quick Bites"
                        />
                        <label htmlFor="Quick Bites">Quick Bites</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Beverage Shop"
                          name="restype"
                          value="Beverage Shop"
                        />
                        <label htmlFor="Beverage Shop">Beverage Shop</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Dessert Parlour"
                          name="restype"
                          value="Dessert Parlour"
                        />
                        <label htmlFor="Dessert Parlour">Dessert Parlour</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Sweet Shop"
                          name="restype"
                          value="Sweet Shop"
                        />
                        <label htmlFor="Sweet Shop">Sweet Shop</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Cafe"
                          name="restype"
                          value="Cafe"
                        />
                        <label htmlFor="Cafe">Cafe</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Food Court"
                          name="restype"
                          value="Food Court"
                        />
                        <label htmlFor="Food Court">Food Court</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Club"
                          name="restype"
                          value="Club"
                        />
                        <label htmlFor="Club">Club</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* fifth part */}
              <div className="add-right-fifth p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">Type of cuisines</div>
                  <div className="text-sm">
                    Select options which best describe food your serve
                  </div>
                </div>
                <div className="p-3">
                  <div className="pt-2 flex flex-column">
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Beverages"
                          name="rescuisinetype"
                          value="Beverages"
                        />
                        <label htmlFor="Beverages">Beverages</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Desserts"
                          name="rescuisinetype"
                          value="Desserts"
                        />
                        <label htmlFor="Desserts">Desserts</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="South Indian"
                          name="rescuisinetype"
                          value="South Indian"
                        />
                        <label htmlFor="South Indian">South Indian</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Biryani"
                          name="rescuisinetype"
                          value="Biryani"
                        />
                        <label htmlFor="Biryani">Biryani</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Fast Food"
                          name="rescuisinetype"
                          value="Fast Food"
                        />
                        <label htmlFor="Fast Food">Fast Food</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Street Food"
                          name="rescuisinetype"
                          value="Street Food"
                        />
                        <label htmlFor="Street Food">Street Food</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Chinese"
                          name="rescuisinetype"
                          value="Chinese"
                        />
                        <label htmlFor="Chinese">Chinese</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="North Indian"
                          name="rescuisinetype"
                          value="North Indian"
                        />
                        <label htmlFor="North Indian">North Indian</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Coffee"
                          name="rescuisinetype"
                          value="Coffee"
                        />
                        <label htmlFor="Coffee">Coffee</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* sixth part */}
              <div className="add-right-sixth p-4 rounded-lg">
                <div className="p-3">
                  <div className="text-2xl font-semibold">
                    Restaurant operational hours
                  </div>
                  <div className="text-sm">
                    Mark restaurant opening and closing hours
                  </div>
                </div>
                <div className="p-1 flex flex-column gap-2">
                  <div className="p-2 flex flex-row justify-center items-center">
                    <div className="justify-center items-center">
                      <div className="p-2">Opens at</div>
                      <input
                        type="time"
                        id="openingtime"
                        name="openingtime"
                        className="border-2 border-gray-300 rounded py-2 px-4"
                        {...register("openingtime", {
                          required: {
                            value: true,
                            message: "Restaurant opening time is required",
                          },
                        })}
                        value={openingTime}
                        onChange={handleOpeningTimeChange}
                      />
                      <p className="text-sm text-red-500">
                        {errors.openingtime?.message}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 flex flex-column justify-center items-center">
                    <div className="h-full pb-8 pt-12 px-8 justify-center items-center">
                      to
                    </div>
                  </div>
                  <div className="p-2 flex flex-column justify-center items-center">
                    <div className="justify-center items-center">
                      <div className="p-2">Closes at</div>
                      <input
                        type="time"
                        id="closingtime"
                        name="closingtime"
                        className="border-2 border-gray-300 rounded py-2 px-4"
                        {...register("closingtime", {
                          required: {
                            value: true,
                            message: "Restaurant closing time is required",
                          },
                        })}
                        value={closingTime}
                        onChange={handleClosingTimeChange}
                      />
                      <p className="text-sm text-red-500">
                        {errors.closingtime?.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="">
                    <div className="text-xl">Mark open days</div>
                    <div className="text-xs">
                      Don't forget to uncheck your off-day
                    </div>
                  </div>
                  <div className="pt-4 flex flex-column">
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Monday"
                          name="resdays"
                          value="Monday"
                          defaultChecked
                        />
                        <label htmlFor="Monday">Monday</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Tuesday"
                          name="resdays"
                          value="Tuesday"
                          defaultChecked
                        />
                        <label htmlFor="Tuesday">Tuesday</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Wednesday"
                          name="resdays"
                          value="Wednesday"
                          defaultChecked
                        />
                        <label htmlFor="Wednesday">Wednesday</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Thursday"
                          name="resdays"
                          value="Thursday"
                          defaultChecked
                        />
                        <label htmlFor="Thursday">Thursday</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Friday"
                          name="resdays"
                          value="Friday"
                          defaultChecked
                        />
                        <label htmlFor="Friday">Friday</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Saturday"
                          name="resdays"
                          value="Saturday"
                          defaultChecked
                        />
                        <label htmlFor="Saturday">Saturday</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Sunday"
                          name="resdays"
                          value="Sunday"
                          defaultChecked
                        />
                        <label htmlFor="Sunday">Sunday</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* footer */}
              <div className="add-footer">
                <div className="md:flex md:p-0 absolute md:static w-full md:w-auto transition-all duration-500 ease-in align-middle justify-center items-center gap-20">
                  <div className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 hover:bg-orange-500 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                    <Link
                      className="text-white-900 duration-500"
                      to="/addRestaurant/addForm/1"
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

export default AddForm2;
