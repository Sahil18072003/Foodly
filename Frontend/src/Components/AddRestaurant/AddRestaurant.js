import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import "./AddRestaurant.css";

function AddRestaurant() {
  useEffect(() => {
    document.title = "Add Restaurant | Foodly";
  }, []);

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
              <ul className="md:flex mt-2 md:p-0 p-10 absolute md:static w-full md:w-auto transition-all duration-500 ease-in">
                <li className="md:ml-8 text-md font-semibold md:my-0 my-7 bg-orange-400 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                  <Link
                    className="text-white-900 duration-500"
                    to="/addRestaurant/addForm"
                  >
                    Register your Restaurant
                  </Link>
                </li>

                <li className="md:ml-8 text-md font-semibold md:my-0 my-7 bg-orange-400 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
                  <Link className="text-gray-800 duration-500" to="/dashboard">
                    View your existing Restaurant
                  </Link>
                </li>
              </ul>
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
                Why should you partner with Zomato?
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
                      1000+ cities
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
                      3 lakh+
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
                      5.0 crore+
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
                  <div className="px-8 pt-8">
                    <img
                      className="w-full object-cover object-center"
                      src={require(`../../assets/Restaurant/First.png`)}
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
                      className="w-full object-cover object-center"
                      src={require(`../../assets/Restaurant/Second.png`)}
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
                      className="w-full object-cover object-center"
                      src={require(`../../assets/Restaurant/Third.png`)}
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
    </div>
  );
}

export default AddRestaurant;
