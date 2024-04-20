import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FindRestaurant() {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    document.title = "Dashboard | Find Restaurant";
    getRestaurantData();
  }, []);

  const restaurantPage = (resId) => {
    navigate(`/restaurantPage/${resId}`);
  };

  const getCurrentTime = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour < 12) {
      return {
        openingTimeKey: "morningopeningtime",
        closingTimeKey: "morningclosingtime",
      };
    } else if (currentHour >= 12 && currentHour < 18) {
      return {
        openingTimeKey: "afternoonopeningtime",
        closingTimeKey: "afternoonclosingtime",
      };
    } else {
      return {
        openingTimeKey: "eveningopeningtime",
        closingTimeKey: "nightclosingtime",
      };
    }
  };

  const { openingTimeKey, closingTimeKey } = getCurrentTime();

  const [activeStep, setActiveStep] = useState(1);

  const getRestaurantData = async () => {
    try {
      const result = await fetch(`${host}/api/admin/getAllRestaurantDetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await result.json();

      if (!data) {
        toast.error("Your Token has expired... Login again", {
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
          localStorage.clear();
          navigate("/login");
        }, 2000);
      } else {
        setRestaurant(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  return (
    <div className="container-lg">
      <div className="img_width">
        <div className="container mb-5 mx-auto">
          <div className="flex flex-wrap">
            <Link
              className={`sm:px-6 px-2 py-5 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 text-3xl font-semibold inline-flex items-center leading-none ${
                activeStep === 1 ? "border-orange-500 text-orange-500" : ""
              }  tracking-wider rounded-t`}
              onClick={() => setActiveStep(1)}
            >
              <div
                className={`p-4 bg-white-900 rounded-full ${
                  activeStep === 1 ? "p-4 bg-orange-100 rounded-full" : ""
                }`}
              >
                <img
                  src={require(`../../assets/FindRestaurant/Dining.avif`)}
                  alt=""
                  className={`w-8 h-8 bg-white-500 ${
                    activeStep === 1 ? "bg-orange-100" : ""
                  }`}
                />
              </div>
              <span className="ml-6">Dining Out</span>
            </Link>
            <Link
              className={`sm:px-6 px-2 py-5 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 text-3xl font-semibold inline-flex items-center leading-none ${
                activeStep === 2 ? "border-orange-500 text-orange-500" : ""
              } border-gray-200 hover:text-gray-900 tracking-wider rounded-t`}
              onClick={() => setActiveStep(2)}
            >
              <div
                className={`p-4 bg-white-900 rounded-full ${
                  activeStep === 2 ? "p-4 bg-orange-100 rounded-full" : ""
                }`}
              >
                <img
                  src={require(`../../assets/FindRestaurant/Delivery.webp`)}
                  alt=""
                  className={`w-8 h-8 bg-white-500 ${
                    activeStep === 2 ? "bg-orange-100" : ""
                  }`}
                />
              </div>
              <span className="ml-6">Delivery</span>
            </Link>
          </div>

          <div className="flex flex-col w-full">
            <h1 className="text-2xl font-medium title-font my-4 text-gray-900">
              {activeStep === 1
                ? "Trending dining restaurants"
                : "Trending delivery restaurants"}
            </h1>

            <div className="leading-relaxed text-base w-full">
              {activeStep === 1 ? (
                <section className="text-gray-600 body-font">
                  <div className="flex flex-wrap container">
                    {restaurant
                      .filter(
                        (res) =>
                          res.rescategory ===
                            "Both, delivery and dine-in available" ||
                          res.rescategory === "Dine-in only"
                      )
                      .map((res, index) => (
                        <div
                          key={index}
                          onClick={() => restaurantPage(res?._id)}
                          className="px-5 py-5 my-5 w-full md:w-1/3 lg:w-1/3 flex flex-col justify-between"
                        >
                          <div className="bg-orange-200 border-2 hover:border-orange-400 hover:scale-105 border shadow-xl bg-opacity-75 rounded-lg overflow-hidden relative">
                            <div className="img-container">
                              <img
                                src={res?.resimg}
                                alt="Hold"
                                className="rounded-t-xl"
                              />
                            </div>
                            <div className="p-3">
                              <h2 className="text-lg font-medium text-gray-800">
                                {res?.resname}
                              </h2>
                              <p className="text-md font-normal text-gray-600 mb-2">
                                Restaurant Type :{" "}
                                {Array.isArray(res?.restypes)
                                  ? res?.restypes.join(", ")
                                  : res?.restypes}
                              </p>
                              <p className="text-md font-normal text-gray-600 mb-2">
                                {Array.isArray(res?.rescuisinetype)
                                  ? res?.rescuisinetype.join(", ")
                                  : res?.rescuisinetype}
                              </p>
                              <h2 className="text-md font-normal text-gray-600 mb-2">
                                {res?.resadd}
                              </h2>
                              {new Date().getHours() >=
                                res?.[openingTimeKey].split(":")[0] &&
                              new Date().getHours() <
                                res?.[closingTimeKey].split(":")[0] ? (
                                <p className="text-md font-normal text-red-600 mb-2">
                                  Closes at {res?.[closingTimeKey]}
                                </p>
                              ) : (
                                <p className="text-md font-normal text-green-600 mb-2">
                                  Opens at {res?.[openingTimeKey]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    {restaurant.length === 0 && (
                      <p className="text-gray-500 text-center w-full mt-6">
                        No restaurants available
                      </p>
                    )}
                  </div>
                </section>
              ) : (
                <section className="text-gray-600 body-font">
                  <div className="flex flex-wrap container">
                    {restaurant &&
                      restaurant
                        .filter(
                          (res) =>
                            res.rescategory ===
                              "Both, delivery and dine-in available" ||
                            res.rescategory === "Delivery only"
                        )
                        .map((res, index) => (
                          <div
                            key={index}
                            onClick={() => restaurantPage(res?._id)}
                            className="px-5 py-5 my-5 w-full md:w-1/3 lg:w-1/3 flex flex-col justify-between"
                          >
                            <div className="bg-orange-200 border-2 hover:border-orange-400 hover:scale-105 border shadow-xl bg-opacity-75 rounded-lg overflow-hidden relative">
                              <div className="img-container">
                                <img
                                  src={res?.resimg}
                                  alt="Hold"
                                  className="rounded-t-xl"
                                />
                              </div>
                              <div className="p-3">
                                <h2 className="text-lg font-medium text-gray-800">
                                  {res?.resname}
                                </h2>
                                <p className="text-md font-normal text-gray-600 mb-2">
                                  Restaurant Type :{" "}
                                  {Array.isArray(res?.restypes)
                                    ? res?.restypes.join(", ")
                                    : res?.restypes}
                                </p>
                                <p className="text-md font-normal text-gray-600 mb-2">
                                  {Array.isArray(res?.rescuisinetype)
                                    ? res?.rescuisinetype.join(", ")
                                    : res?.rescuisinetype}
                                </p>
                                <h2 className="text-md font-normal text-gray-600 mb-2">
                                  {res?.resadd}
                                </h2>
                                {new Date().getHours() >=
                                  res?.[openingTimeKey].split(":")[0] &&
                                new Date().getHours() <
                                  res?.[closingTimeKey].split(":")[0] ? (
                                  <p className="text-md font-normal text-red-600 mb-2">
                                    Closes at {res?.[closingTimeKey]}
                                  </p>
                                ) : (
                                  <p className="text-md font-normal text-green-600 mb-2">
                                    Opens at {res?.[openingTimeKey]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    {restaurant.length === 0 && (
                      <p className="text-gray-500 text-center w-full mt-6">
                        No restaurants available
                      </p>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindRestaurant;
