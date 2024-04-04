import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faGem,
  fa3,
  fa4,
  faCircleArrowUp,
  faHouseCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { BsShop } from "react-icons/bs";
import { MdDeliveryDining } from "react-icons/md";
import { GiAlliedStar } from "react-icons/gi";
import { TbCoinRupee } from "react-icons/tb";
import { AiOutlineCamera } from "react-icons/ai";
import { LiaUserSolid } from "react-icons/lia";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddForm.css";

function AddForm6() {
  const host = "http://localhost:5000";

  const user = JSON.parse(localStorage.getItem("user"));
  const restaurant = JSON.parse(localStorage.getItem("restaurant"))
    ? JSON.parse(localStorage.getItem("restaurant"))
    : "";

  const [creditial, setCreditial] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Form | Foodly";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    const partnershipplan = document.querySelector(
      'input[name="partnershipplan"]:checked'
    )?.value;

    // Check if all required fields are filled
    if (partnershipplan !== "") {
      // If restaurant exists, update its values
      const response = await fetch(
        `${host}/api/res/addRestaurant/addFrom/6/${restaurant?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: restaurant?._id,
            partnershipplan: partnershipplan,
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

        toast.success("Partnership plan Updated Successfully.", {
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
            `/addRestaurant/addForm/7?resId=${json.updatedRestaurant._id}`
          );
        }, 2000);
      } else {
        toast.error("Failed to update partnership plan", {
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
      toast.error("Please select partnership plan...", {
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
            <button className="pt-2" onClick={backFrom}>
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
            <button className="pt-2" onClick={backFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-green-400 rounded-full px-2 pt-2 pb-1 my-4">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-6 h-6" />
                </div>
                <div className="w-5/6 p-1">
                  <div className="add-left-text">Upload Documents</div>
                  <div className="add-left-sub-text">
                    PAN, GST, FSSAI and bank account details
                  </div>
                </div>
              </div>
            </button>
            <button className="pt-2" onClick={currFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-orange-400 rounded-full p-2 my-4">
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
          <div className="add-first-part-6">
            <div className="text-5xl font-bold text-center">
              Grow with Foodly's Partnership plans
            </div>
            <form onSubmit={handleSubmit(clickHandler)}>
              {/* first part */}
              <div className="plan-main-div">
                <div className="plan-sub-div h-full rounded-lg hover:border-orange-400 flex flex-col relative overflow-hidden">
                  <div className="bg-orange-100 p-3 font-sans">
                    <span className="bg-orange-400 text-white px-4 py-2 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                      POPULAR
                    </span>
                    <div className="flex flex-column">
                      <FontAwesomeIcon icon={faGem} className="mt-2 mr-2" />
                      <p className="text-2xl tracking-widest title-font mb-1 font-medium">
                        Premium
                      </p>
                    </div>
                    <p className="text-sm font-sans">
                      Maximum your sales with highest visibility. dedicated
                      account manager, marketing assistance from Foodly and
                      more!
                    </p>
                  </div>
                  <div className="bg-white-900 p-3">
                    <div className="text-2xl font-bold text-gray-900 border-b border-orange-200 pb-3">
                      <p className="flex text-base font-bold ml-1 font-normal text-gray-500">
                        Service fee from 2nd month
                      </p>
                      <div className="flex flex-inline">
                        <p>10%</p>
                        <p className="text-base font-normal text-gray-500 px-2 py-1">
                          +
                        </p>
                        <p>2%</p>
                        <p className="text-base font-normal text-gray-500 px-2 pt-2">
                          for Premium benefits
                        </p>
                      </div>
                    </div>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <BsShop />
                      <span className="text-sm text-gray-600">
                        Onboarding services
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <MdDeliveryDining />
                      <span className="text-sm text-gray-600">
                        Visibility to customers up to 12 km
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <GiAlliedStar />
                      <span className="text-sm text-gray-600">
                        Access to Foodly Gold program
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <TbCoinRupee />
                      <span className="text-sm text-gray-600">
                        Get ads worth Rs.50,000 (one-time)
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <AiOutlineCamera />
                      <span className="text-sm text-gray-600">
                        Get professional dish photoshoot
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <LiaUserSolid />
                      <span className="text-sm text-gray-600">
                        Dedicated account manager
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <FaRegMoneyBillAlt />
                      <span className="text-sm text-start text-gray-600">
                        Get marketing worth 3% of your monthly revene
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <RxCrossCircled />
                      <span className="text-sm text-gray-600">
                        20% discount on ads
                      </span>
                    </p>
                    <div className="bg-purple-300 rounded-xl text-center text-sm py-1 m-3 text-violet-900">
                      <FontAwesomeIcon
                        icon={faCircleArrowUp}
                        className="mr-2"
                      />
                      <span>Estimated 0X sales of Basic</span>
                    </div>

                    <div className="text-center bg-orange-400 mx-24 py-1 rounded-lg">
                      <input
                        type="radio"
                        name="partnershipplan"
                        id="Premium"
                        value="Premium"
                        {...register("partnershipplan", {
                          required: {
                            value: true,
                            message: "Please select plan is required",
                          },
                        })}
                      />
                      <label htmlFor="Premium" className="text-lg pl-2">
                        Select
                      </label>
                    </div>
                  </div>
                </div>
                <div className="plan-sub-div h-full rounded-lg hover:border-orange-400 flex flex-col relative overflow-hidden">
                  <div className="bg-orange-100 p-3 font-sans">
                    <div className="flex flex-column">
                      <FontAwesomeIcon icon={faGem} className="mt-2 mr-2" />
                      <p className="text-2xl tracking-widest title-font mb-1 font-medium">
                        Basic
                      </p>
                    </div>
                    <p className="text-sm font-sans">
                      Maximum your sales with highest visibility. dedicated
                      account manager, marketing assistance from Foodly and
                      more!
                    </p>
                  </div>
                  <div className="bg-white-900 p-3">
                    <div className="text-2xl font-bold text-gray-900 border-b border-orange-200 pb-3">
                      <p className="flex text-base font-bold ml-1 font-normal text-gray-500">
                        Service fee from 2nd month
                      </p>
                      <div className="flex flex-inline">
                        <p>10%</p>
                        <p className="text-base font-normal text-gray-500 px-2 py-1">
                          +
                        </p>
                        <p>0%</p>
                        <p className="text-base font-normal text-gray-500 px-2 pt-2">
                          for Premium benefits
                        </p>
                      </div>
                    </div>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <BsShop />
                      <span className="text-sm text-gray-600">
                        Onboarding services
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <MdDeliveryDining />
                      <span className="text-sm text-gray-600">
                        Visibility to customers up to 8 km
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <GiAlliedStar />
                      <span className="text-sm text-gray-600">
                        Access to Foodly Gold program
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <TbCoinRupee />
                      <span className="text-sm text-gray-600">
                        Get ads worth Rs.20,000 (one-time)
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <AiOutlineCamera />
                      <span className="text-sm text-gray-600">
                        Get professional dish photoshoot
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <LiaUserSolid />
                      <span className="text-sm text-gray-400">
                        Dedicated account manager
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <FaRegMoneyBillAlt />
                      <span className="text-sm text-start text-gray-400">
                        Get marketing worth 3% of your monthly revene
                      </span>
                    </p>
                    <p className="flex items-center text-gray-600 my-2 gap-2">
                      <RxCrossCircled />
                      <span className="text-sm text-gray-400">
                        20% discount on ads
                      </span>
                    </p>
                    <div className="bg-purple-300 rounded-xl text-center text-sm py-1 m-3 text-violet-900">
                      <FontAwesomeIcon
                        icon={faCircleArrowUp}
                        className="mr-2"
                      />
                      <span>Estimated 0X sales of Basic</span>
                    </div>

                    <div className="text-center bg-orange-400 mx-24 py-1 rounded-lg">
                      <input
                        type="radio"
                        name="partnershipplan"
                        id="Basic"
                        value="Basic"
                        {...register("partnershipplan", {
                          required: {
                            value: true,
                            message: "Please select plan is required",
                          },
                        })}
                      />
                      <label htmlFor="Basic" className="text-lg pl-2">
                        Select
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* footer */}
              <div className="add-footer">
                <div className="md:flex md:p-0 absolute md:static w-full md:w-auto transition-all duration-500 ease-in align-middle justify-center items-center gap-20">
                  <button className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 hover:bg-orange-500 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                    <Link
                      className="text-white-900 duration-500"
                      to="/addRestaurant"
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

export default AddForm6;
