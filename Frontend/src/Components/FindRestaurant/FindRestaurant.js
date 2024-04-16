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
  console.log(restaurant);

  useEffect(() => {
    document.title = "Dashboard | Find Restaurant";
  }, []);

  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const getRestaurant = async () => {
      const result = await fetch(`${host}/api/res/dashboard/${user?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ownerid: user?._id }),
      });

      var data = await result.json();

      if (!data) {
        toast.error("Your Token has expired... login again", {
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
        setRestaurant(data);
      }
    };

    getRestaurant();
  }, []);

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

          <div className="flex flex-col w-full border-2 border-gray-400">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
              {activeStep === 1
                ? "Trending dining restaurants"
                : "Trending delivery restaurants"}
            </h1>

            <div className="leading-relaxed text-base w-full">
              {activeStep === 1 ? (
                <section className="text-gray-600 body-font border-2 border-gray-400">
                  <div className="">
                    {restaurant
                      .filter(
                        (res) =>
                          res.rescategory ===
                            "Both, delivery and dine-in available" ||
                          res.rescategory === "Dine-in only"
                      )
                      .map((res) => (
                        <Link
                          to="/restaurantPage/"
                          onClick={() =>
                            localStorage.setItem("pressCard", res?._id)
                          }
                          key={res._id}
                        >
                          <div className="flex items-center lg:w-3/4 border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                            {res?.resname}
                          </div>
                        </Link>
                      ))}
                  </div>
                </section>
              ) : (
                <section className="text-gray-600 body-font border-2 border-red-400">
                  <div className="w-1/3 flex flex-wrap border-2 border-gray-400">
                    <div className="border-2 border-gray-400">
                      {restaurant
                        .filter(
                          (res, index) =>
                            res.rescategory ===
                              "Both, delivery and dine-in available" ||
                            res.rescategory === "Delivery only"
                        )
                        .map((res, index) => (
                          <Link
                            to="/restaurantPage/"
                            onClick={() =>
                              localStorage.setItem("pressCard", res?._id)
                            }
                            key={res?._id}
                          >
                            <div className="flex items-center lg:w-1/3 sm:flex-row flex-col">
                              <div className="">
                                <img
                                  src={res?.foodimg}
                                  alt=""
                                  className="mx-4 w-12 h-12 text-indigo-900 bg-white-500"
                                ></img>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
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
