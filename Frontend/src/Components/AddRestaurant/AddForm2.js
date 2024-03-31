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

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedResType, setSelectedResType] = useState([]);
  const [selectedResCuisineType, setSelectedResCuisineType] = useState([]);
  const [selectedResDays, setSelectedResDays] = useState([]);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  useEffect(() => {
    const storedCategory = restaurant.rescategory;
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }

    const storedResType = restaurant.restypes;
    if (storedResType) {
      setSelectedResType(storedResType);
    }

    const storedResCuisineType = restaurant.rescuisinetype;
    if (storedResCuisineType) {
      setSelectedResCuisineType(storedResCuisineType);
    }

    const storedResDays = restaurant.resdays;
    if (storedResDays) {
      setSelectedResDays(storedResDays);
    }

    const storedOpeningTime = restaurant.openingtime;
    if (storedOpeningTime) {
      setOpeningTime(storedOpeningTime);
    }

    const storedClosingTime = restaurant.closingtime;
    if (storedClosingTime) {
      setClosingTime(storedClosingTime);
    }
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleResTypeChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedResType([...selectedResType, value]);
    } else {
      setSelectedResType(selectedResType.filter((type) => type !== value));
    }
  };

  const handleResCuisineTypeChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedResCuisineType([...selectedResCuisineType, value]);
    } else {
      setSelectedResCuisineType(
        selectedResCuisineType.filter((type) => type !== value)
      );
    }
  };

  const handleResDaysChange = (e) => {
    const value = e.target.value;
    console.log(value);
    if (e.target.checked) {
      setSelectedResDays([...selectedResDays, value]);
    } else {
      setSelectedResDays(selectedResDays.filter((type) => type !== value));
    }
  };

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

      if (json) {
        localStorage.setItem(
          "restaurant",
          JSON.stringify(json.updatedRestaurant)
        );

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
    } else if (selectedResCuisineType === 0) {
      toast.error("Please select at least one cuisine type", {
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
    } else if (selectedResType === 0) {
      toast.error("Please select at least one restaurent type", {
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
      toast.error("Please select at least on day", {
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
          <div className="add-left-first p-4 rounded-lg">
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
            <button
              className="py-2 border-2 border-gray-900"
              onClick={currFrom}
            >
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
              className="pt-2 border-2 border-gray-900"
              onClick={nextFrom}
            >
              <div className="flex flex-column">
                <div className="w-1/6 border-2 border-gray-900 rounded-full p-1 my-4">
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
                        checked={
                          selectedCategory ===
                          "Both, delivery and dine-in available"
                        }
                        onChange={handleCategoryChange}
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
                        checked={selectedCategory === "Dine-in only"}
                        onChange={handleCategoryChange}
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
                        checked={selectedCategory === "Delivery only"}
                        onChange={handleCategoryChange}
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
                  <div className="pt-4 flex flex-row">
                    <div className="w-1/3">
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Bakery"
                          name="restype"
                          value="Bakery"
                          checked={selectedResType.includes("Bakery")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Bakery">Bakery</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Bhojanalya"
                          name="restype"
                          value="Bhojanalya"
                          checked={selectedResType.includes("Bhojanalya")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Bhojanalya">Bhojanalya</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Casual Dining"
                          name="restype"
                          value="Casual Dining"
                          checked={selectedResType.includes("Casual Dining")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Casual Dining">Casual Dining</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Confectionery"
                          name="restype"
                          value="Confectionery"
                          checked={selectedResType.includes("Confectionery")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Confectionery">Confectionery</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Fine Dining"
                          name="restype"
                          value="Fine Dining"
                          checked={selectedResType.includes("Fine Dining")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Fine Dining">Fine Dining</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Irani Cafe"
                          name="restype"
                          value="Irani Cafe"
                          checked={selectedResType.includes("Irani Cafe")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Irani Cafe">Irani Cafe</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Mess"
                          name="restype"
                          value="Mess"
                          checked={selectedResType.includes("Mess")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Mess">Mess</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Bar"
                          name="restype"
                          value="Bar"
                          checked={selectedResType.includes("Bar")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Bar">Bar</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Butcher Shop"
                          name="restype"
                          value="Butcher Shop"
                          checked={selectedResType.includes("Butcher Shop")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Butcher Shop">Butcher Shop</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Club"
                          name="restype"
                          value="Club"
                          checked={selectedResType.includes("Club")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Club">Club</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Dessert Parlour"
                          name="restype"
                          value="Dessert Parlour"
                          checked={selectedResType.includes("Dessert Parlour")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Dessert Parlour">Dessert Parlour</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Food Court"
                          name="restype"
                          value="Food Court"
                          checked={selectedResType.includes("Food Court")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Food Court">Food Court</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Kiosk"
                          name="restype"
                          value="Kiosk"
                          checked={selectedResType.includes("Kiosk")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Kiosk">Kiosk</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Sweet Shop"
                          name="restype"
                          value="Sweet Shop"
                          checked={selectedResType.includes("Sweet Shop")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Sweet Shop">Sweet Shop</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Beverage Shop"
                          name="restype"
                          value="Beverage Shop"
                          checked={selectedResType.includes("Beverage Shop")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Beverage Shop">Beverage Shop</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Cafe"
                          name="restype"
                          value="Cafe"
                          checked={selectedResType.includes("Cafe")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Cafe">Cafe</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Dhaba"
                          name="restype"
                          value="Dhaba"
                          checked={selectedResType.includes("Dhaba")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Dhaba">Dhaba</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Food Truck"
                          name="restype"
                          value="Food Truck"
                          checked={selectedResType.includes("Food Truck")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Food Truck">Food Truck</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Lounge"
                          name="restype"
                          value="Lounge"
                          checked={selectedResType.includes("Lounge")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Lounge">Lounge</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Paan Shop"
                          name="restype"
                          value="Paan Shop"
                          checked={selectedResType.includes("Paan Shop")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Paan Shop">Paan Shop</label>
                      </div>
                      <div className="flex flex-column gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Pub"
                          name="restype"
                          value="Pub"
                          checked={selectedResType.includes("Pub")}
                          onChange={handleResTypeChange}
                        />
                        <label htmlFor="Pub">Pub</label>
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
                          id="Bakery1"
                          name="rescuisinetype"
                          value="Bakery"
                          checked={selectedResCuisineType.includes("Bakery")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Bakery1">Bakery</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Burger"
                          name="rescuisinetype"
                          value="Burger"
                          checked={selectedResCuisineType.includes("Burger")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Burger">Burger</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Cake"
                          name="rescuisinetype"
                          value="Cake"
                          checked={selectedResCuisineType.includes("Cake")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Cake">Cake</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Coffee & Tea"
                          name="rescuisinetype"
                          value="Coffee & Tea"
                          checked={selectedResCuisineType.includes(
                            "Coffee & Tea"
                          )}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Coffee & Tea">Coffee & Tea</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Gujarati"
                          name="rescuisinetype"
                          value="Gujarati"
                          checked={selectedResCuisineType.includes("Gujarati")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Gujarati">Gujarati</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Hyderabadi"
                          name="rescuisinetype"
                          value="Hyderabadi"
                          checked={selectedResCuisineType.includes(
                            "Hyderabadi"
                          )}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Hyderabadi">Hyderabadi</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Italian"
                          name="rescuisinetype"
                          value="Italian"
                          checked={selectedResCuisineType.includes("Italian")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Italian">Italian</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Maharashtrian"
                          name="rescuisinetype"
                          value="Maharashtrian"
                          checked={selectedResCuisineType.includes(
                            "Maharashtrian"
                          )}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Maharashtrian">Maharashtrian</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="North Indian"
                          name="rescuisinetype"
                          value="North Indian"
                          checked={selectedResCuisineType.includes(
                            "North Indian"
                          )}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="North Indian">North Indian</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Panjabi"
                          name="rescuisinetype"
                          value="Panjabi"
                          checked={selectedResCuisineType.includes("Panjabi")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Panjabi">Panjabi</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Salad"
                          name="rescuisinetype"
                          value="Salad"
                          checked={selectedResCuisineType.includes("Salad")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Salad">Salad</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Seafood"
                          name="rescuisinetype"
                          value="Seafood"
                          checked={selectedResCuisineType.includes("Seafood")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Seafood">Seafood</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Bar Food"
                          name="rescuisinetype"
                          value="Bar Food"
                          checked={selectedResCuisineType.includes("Bar Food")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Bar Food">Bar Food</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Cafe1"
                          name="rescuisinetype"
                          value="Cafe"
                          checked={selectedResCuisineType.includes("Cafe")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Cafe1">Cafe</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Chinese"
                          name="rescuisinetype"
                          value="Chinese"
                          checked={selectedResCuisineType.includes("Chinese")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Chinese">Chinese</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Desserts"
                          name="rescuisinetype"
                          value="Desserts"
                          checked={selectedResCuisineType.includes("Desserts")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Desserts">Desserts</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Healthy Food"
                          name="rescuisinetype"
                          value="Healthy Food"
                          checked={selectedResCuisineType.includes(
                            "Healthy Food"
                          )}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Healthy Food">Healthy Food</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Ice Cream"
                          name="rescuisinetype"
                          value="Ice Cream"
                          checked={selectedResCuisineType.includes("Ice Cream")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Ice Cream">Ice Cream</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Japanese"
                          name="rescuisinetype"
                          value="Japanese"
                          checked={selectedResCuisineType.includes("Japanese")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Japanese">Japanese</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Mexican"
                          name="rescuisinetype"
                          value="Mexican"
                          checked={selectedResCuisineType.includes("Mexican")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Mexican">Mexican</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Paan"
                          name="rescuisinetype"
                          value="Paan"
                          checked={selectedResCuisineType.includes("Paan")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Paan">Paan</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Rajasthani"
                          name="rescuisinetype"
                          value="Rajasthani"
                          checked={selectedResCuisineType.includes(
                            "Rajasthani"
                          )}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Rajasthani">Rajasthani</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Sandwich"
                          name="rescuisinetype"
                          value="Sandwich"
                          checked={selectedResCuisineType.includes("Sandwich")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Sandwich">Sandwich</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Street Food"
                          name="rescuisinetype"
                          value="Street Food"
                          checked={selectedResCuisineType.includes(
                            "Street Food"
                          )}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Street Food">Street Food</label>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Beverages"
                          name="rescuisinetype"
                          value="Beverages"
                          checked={selectedResCuisineType.includes("Beverages")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Beverages">Beverages</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Cafe Food"
                          name="rescuisinetype"
                          value="Cafe Food"
                          checked={selectedResCuisineType.includes("Cafe Food")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Cafe Food">Cafe Food</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Coffee"
                          name="rescuisinetype"
                          value="Coffee"
                          checked={selectedResCuisineType.includes("Coffee")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Coffee">Coffee</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Fast Food"
                          name="rescuisinetype"
                          value="Fast Food"
                          checked={selectedResCuisineType.includes("Fast Food")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Fast Food">Fast Food</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Hot Dogs"
                          name="rescuisinetype"
                          value="Hot Dogs"
                          checked={selectedResCuisineType.includes("Hot Dogs")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Hot Dogs">Hot Dogs</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Indian"
                          name="rescuisinetype"
                          value="Indian"
                          checked={selectedResCuisineType.includes("Indian")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Indian">Indian</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Juices"
                          name="rescuisinetype"
                          value="Juices"
                          checked={selectedResCuisineType.includes("Juices")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Juices">Juices</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Momos"
                          name="rescuisinetype"
                          value="Momos"
                          checked={selectedResCuisineType.includes("Momos")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Momos">Momos</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Pizza"
                          name="rescuisinetype"
                          value="Pizza"
                          checked={selectedResCuisineType.includes("Pizza")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Pizza">Pizza</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Rolls"
                          name="rescuisinetype"
                          value="Rolls"
                          checked={selectedResCuisineType.includes("Rolls")}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="Rolls">Rolls</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="South Indian"
                          name="rescuisinetype"
                          value="South Indian"
                          checked={selectedResCuisineType.includes(
                            "South Indian"
                          )}
                          onChange={handleResCuisineTypeChange}
                        />
                        <label htmlFor="South Indian">South Indian</label>
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
                          checked={selectedResDays.includes("Monday")}
                          onChange={handleResDaysChange}
                        />
                        <label htmlFor="Monday">Monday</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Tuesday"
                          name="resdays"
                          value="Tuesday"
                          checked={selectedResDays.includes("Tuesday")}
                          onChange={handleResDaysChange}
                        />
                        <label htmlFor="Tuesday">Tuesday</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Wednesday"
                          name="resdays"
                          value="Wednesday"
                          checked={selectedResDays.includes("Wednesday")}
                          onChange={handleResDaysChange}
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
                          checked={selectedResDays.includes("Thursday")}
                          onChange={handleResDaysChange}
                        />
                        <label htmlFor="Thursday">Thursday</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Friday"
                          name="resdays"
                          value="Friday"
                          checked={selectedResDays.includes("Friday")}
                          onChange={handleResDaysChange}
                        />
                        <label htmlFor="Friday">Friday</label>
                      </div>
                      <div className="flex flex-row gap-3 p-2">
                        <input
                          type="checkbox"
                          id="Saturday"
                          name="resdays"
                          value="Saturday"
                          checked={selectedResDays.includes("Saturday")}
                          onChange={handleResDaysChange}
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
                          checked={selectedResDays.includes("Sunday")}
                          onChange={handleResDaysChange}
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
