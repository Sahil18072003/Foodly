import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa4, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddForm.css";

function AddForm7() {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const restaurant = JSON.parse(localStorage.getItem("restaurant"))
    ? JSON.parse(localStorage.getItem("restaurant"))
    : "";

  const [creditial, setCreditial] = useState({
    contactnumber: restaurant?.ownercontact ? restaurant?.ownercontact : "",
  });

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  // const closeModal1 = () => {
  //   setShowModal(false);
  // };

  const navigate = useNavigate();

  const goDashboard = () => {
    navigate(`/dashboard?resId=${restaurant?._id}`);
  };

  useEffect(() => {
    document.title = "Add Form | Foodly";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const backFrom = () => {
    toast.info("Please click on Back to go to the next page", {
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

  const sendContract = async (e) => {
    // Check if all required fields are filled
    if (creditial.owneremail !== "") {
      // If restaurant exists, update its values
      const response = await fetch(
        `${host}/api/res/addRestaurant/addFrom/7/sendContract`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            owneremail: creditial.owneremail,
          }),
        }
      );

      const json = await response.json();

      if (json) {
        localStorage.setItem(
          "restaurant",
          JSON.stringify(json.updatedRestaurant)
        );

        toast.success("Partnership Contract Send Successfully.", {
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
        toast.error("Failed to send Partnership Contract Send", {
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

  const clickHandler = async (e) => {
    // Check if all required fields are filled
    if (creditial.resname !== "") {
      // If restaurant exists, update its values
      const response = await fetch(
        `${host}/api/res/addRestaurant/addFrom/7/${restaurant?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            _id: restaurant?._id,
          }),
        }
      );

      const json = await response.json();

      if (json) {
        localStorage.setItem(
          "restaurant",
          JSON.stringify(json.updatedRestaurant)
        );

        toast.success("Online ordering form submitting Successfully.", {
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
          openModal();
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

  const onChange = (e) => {
    setCreditial({ ...creditial, [e.target.name]: e.target.value });
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
            <button className="pt-2" onClick={backFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-green-400 rounded-full px-2 pt-2 pb-1 my-4">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-6 h-6" />
                </div>
                <div className="w-5/6 p-2">
                  <div className="add-left-text">Partnership Plans</div>
                  <div className="add-left-sub-text">Select your plan</div>
                </div>
              </div>
            </button>
            <button className="pt-1" onClick={currFrom}>
              <div className="flex flex-column">
                <div className="w-1/6 bg-orange-400 rounded-full p-2 my-4">
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
              Restaurant Partner Contract
            </div>
            <form onSubmit={handleSubmit(clickHandler)}>
              {/* first part */}
              <div className="add-right-first px-4 pt-4 pb-8 rounded-lg">
                <table className="border-2 border-gray-900 w-full rounded-lg">
                  <tr className="w-2/5">
                    <td className="border border-gray-900 px-4 py-2">
                      Logistics services
                    </td>
                    <td className="border border-gray-900 px-4 py-2">
                      Order(s) will be delivered to customers by Foodly delivery
                      partners only
                    </td>
                  </tr>
                  <tr className="w-3/5">
                    <td className="border border-gray-900 px-4 py-2">
                      Commission charges Foodly logistics
                    </td>
                    <td className="border border-gray-900 px-4 py-2">10%</td>
                  </tr>
                  <tr className="w-3/5">
                    <td className="border border-gray-900 px-4 py-2">
                      Payment mechanism fee
                    </td>
                    <td className="border border-gray-900 px-4 py-2">
                      1.5% + taxes of Order value
                    </td>
                  </tr>
                  <tr className="w-3/5">
                    <td className="border border-gray-900 px-4 py-2">
                      Additional terms
                    </td>
                    <td className="border border-gray-900 px-4 py-2">
                      <p className="font-bold text-lg">
                        Logistics services and charges
                      </p>
                      <p>
                        1. Logistics services shall be rendered in accordance
                        with the terms.
                      </p>
                      <p>
                        2. The Restaurant Partner agrees it shall not charge
                        delivery charges from the customers for orders for which
                        Foodly undertakes logistics services.
                      </p>
                      <p>
                        3. Foodly has no control, in any manner whatsover, with
                        respect to the ratings or reviews received by the
                        Restaurant Partner for the logistics services availed
                        through Foodly. As ratings are dependent on multiple
                        factors including but not limited to each customers
                        experience.
                      </p>
                      <p>
                        <strong>Taxes: </strong>All amounts payable herein shall
                        be exclusive of applicable taxes, which shall be payable
                        by the Restaurant Partner.
                      </p>
                      <p>
                        <strong>Restaurant Partner compensation: </strong>As set
                        out in the Terms.
                      </p>
                    </td>
                  </tr>
                </table>
                <div className="text-xl font-semibold py-3">
                  Receive and accept Contract on the email
                </div>
                <div className="w-full flex flex">
                  <input
                    type="email"
                    id="owneremail"
                    name="owneremail"
                    className="input-field"
                    value={user ? restaurant?.owneremail : creditial.owneremail}
                    {...register("owneremail", {
                      required: "Restaurant Owner Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                        message: "Restaurant Owner Email is not valid",
                      },
                    })}
                    onChange={onChange}
                    autoComplete="false"
                  />
                  <button
                    className="w-1/3 text-white-800 p-2 text-center text-md font-bold bg-orange-400 hover:bg-orange-500 rounded-md shadow-sm"
                    onClick={sendContract}
                  >
                    Send
                  </button>
                </div>
                <p className="text-sm text-red-500 absolute">
                  {errors.owneremail?.message}
                </p>
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
                    <button className="text-gray-800 duration-500">
                      Submit
                    </button>
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
            <div className="my-2">STEP - 2</div>
            <div className="text-2xl font-bold my-2">
              Online ordering details submitted
            </div>
            <div className="text-xl font-md my-2">
              Our team will verify the details and update once <br /> your page
              is live on Foodly!
            </div>
            <button
              onClick={goDashboard}
              className="bg-gray-100 hover:bg-gray-200 py-3 px-4 my-2 rounded-md shadow-md hover:shadow-lg"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddForm7;
