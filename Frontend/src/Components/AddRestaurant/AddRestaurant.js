import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddRestaurant.css";

function AddRestaurant() {
  useEffect(() => {
    document.title = "Add Restaurant | Foodly";
  }, []);

  const navigate = useNavigate();

  const onClickAddRestaurant = () => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      toast.warn("Login Required", {
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
        navigate(`/login`);
      }, 2000);
    } else {
      setTimeout(() => {
        navigate(`/addRestaurant/addForm/1`);
      });
    }
  };

  const onClickExitingRestaurant = () => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      toast.warn("Login Required", {
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
        navigate(`/login`);
      }, 2000);
    } else {
      setTimeout(() => {
        navigate(`/dashboard`);
      });
    }
  };

  return (
    <div className="add-res-page">
      <div className="res-back">
        <div className="res-sub-back">
          <div className="first">
            <div className="first-content">
              <div className="res-text">
                Partner with Foodly at 0% commission for the 1st month!
              </div>
              <div className="res-sub-text">
                And get ads worth INR 1500. Valid for new restaurant partners in
                select cities.
              </div>
              <div className="md:flex mt-2 md:p-0 p-5 absolute md:static w-full md:w-auto transition-all duration-500 ease-in">
                <button
                  className="w-1/2 p-2 m-2 text-md text-center font-semibold md:my-0 rounded-md bg-orange-400 hover:bg-orange-500 shadow-md hover:shadow-lg"
                  onClick={onClickAddRestaurant}
                >
                  Register your Restaurant
                </button>

                <button
                  className="w-1/2 p-2 m-2 text-md text-center font-semibold md:my-0 rounded-md bg-orange-400 hover:bg-orange-500 shadow-md hover:shadow-lg"
                  onClick={onClickExitingRestaurant}
                >
                  View your existing Restaurant
                </button>
              </div>
              <div className="res-sub-textt">
                Need help? Contact +91 63535 49828
              </div>
            </div>
          </div>
          <div className="mid">
            <div className="mid-content">
              <div className="mid-text">Get started with online ordering</div>
              <div className="mid-textt">
                Please keep the documents ready for a smooth signup
              </div>
              <div className="mid-table">
                <div className="mid-left">
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCircleCheck} /> FSSAI license
                      copy
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCircleCheck} /> Regular GSTIN
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCircleCheck} /> Your restaurant
                      menu
                    </li>
                  </ul>
                </div>
                <div className="mid-right">
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCircleCheck} /> PAN card copy
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCircleCheck} /> Bank account
                      details
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCircleCheck} /> Dish items for
                      top 5 items
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="third">
            <div className="third-content">
              <div className="third-title">
                Why should you partner with Foodly?
              </div>
              <div className="third-text">
                Foodly enables you to get 60% more revenue, 10x new customers
                and boost your brand visibility by providing insights to improve
                your business.
              </div>
              <div className="flex flex-column mx-2 p-4 space-between gap-6">
                <div className="flex flex-column w-1/3 p-5 drop-shadow-2xl rounded-lg bg-orange-200 gap-4">
                  <img
                    className="w-1/3 object-cover object-center"
                    src={require(`../../assets/Restaurant/First.png`)}
                    alt="blog"
                  />
                  <div className="w-2/3 h-full mt-3">
                    <div className="text-sky-600 text-xl align-middle">
                      500+ cities
                    </div>
                    <div className="h-1/2 align-middle">in India</div>
                  </div>
                </div>
                <div className="flex flex-column w-1/3 p-5 drop-shadow-2xl rounded-lg bg-orange-200 gap-4">
                  <img
                    className="w-1/3 object-cover object-center"
                    src={require(`../../assets/Restaurant/Second.png`)}
                    alt="blog"
                  />
                  <div className="w-2/3 h-full mt-3">
                    <div className="text-sky-600 text-xl align-middle">
                      1 lakh+
                    </div>
                    <div className="h-1/2 align-middle">
                      restaurant listings
                    </div>
                  </div>
                </div>
                <div className="flex flex-column w-1/3 p-5 drop-shadow-2xl rounded-lg bg-orange-200 gap-4">
                  <img
                    className="w-1/3 object-cover object-center"
                    src={require(`../../assets/Restaurant/Third.png`)}
                    alt="blog"
                  />
                  <div className="w-2/3 h-full mt-3">
                    <div className="text-sky-600 text-xl align-middle">
                      1.0 crore+
                    </div>
                    <div className="h-1/2 align-middle">monthly orders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="forth">
            <div className="forth-content">
              <div className="forth-title">How it works?</div>
              <div className="flex flex-column mx-2 p-4 space-between gap-6">
                <div className="w-1/3 p-4 drop-shadow-2xl rounded-lg bg-orange-200 gap-4">
                  <div className="px-8 pt-10">
                    <img
                      className="w-full object-cover object-center rounded-full"
                      src={require(`../../assets/Restaurant/page.jpg`)}
                      alt="blog"
                    />
                  </div>
                  <div className="w-full mt-3 p-2">
                    <div className="text-black-600 text-xl text-center">
                      Step 1
                    </div>
                    <div className="text-black-600 text-lg text-center">
                      Create your page on Foodly
                    </div>
                    <div className="text-black-200 text-sm text-center">
                      Help users discover your place by creating a listing on
                      Foodly
                    </div>
                  </div>
                </div>
                <div className="w-1/3 p-4 drop-shadow-2xl rounded-lg bg-orange-200 gap-4">
                  <div className="px-8 pt-8">
                    <img
                      className="w-full object-cover object-center rounded-full"
                      src={require(`../../assets/Restaurant/boy.jpg`)}
                      alt="blog"
                    />
                  </div>
                  <div className="w-full mt-3 p-2">
                    <div className="text-black-600 text-xl text-center">
                      Step 2
                    </div>
                    <div className="text-black-600 text-lg text-center">
                      Register for online ordering
                    </div>
                    <div className="text-black-200 text-sm text-center">
                      And deliver orders to millions of customers with ease
                    </div>
                  </div>
                </div>
                <div className="w-1/3 p-4 drop-shadow-2xl rounded-lg bg-orange-200 gap-4">
                  <div className="px-8 pt-8">
                    <img
                      className="w-full object-cover object-center rounded-full"
                      src={require(`../../assets/Restaurant/order.jpg`)}
                      alt="blog"
                    />
                  </div>
                  <div className="w-full mt-3 p-1">
                    <div className="text-black-600 text-xl text-center">
                      Step 3
                    </div>
                    <div className="text-black-600 text-lg h-1/2 text-center">
                      Start receiving orders online
                    </div>
                    <div className="text-black-200 text-sm text-center">
                      Manage orders on our partner app, web dashboard or API
                      partners
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fifth">
            <div className="fifth-content">
              <div className="fifth-title">
                Already have your restaurant listed?
              </div>
              <div className="fifth-text">
                Search here and claim the ownership of your restaurant
              </div>
            </div>
          </div>
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
    </div>
  );
}

export default AddRestaurant;
