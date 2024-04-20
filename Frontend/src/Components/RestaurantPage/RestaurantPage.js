import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./../Spinner/Spinner";
import Slider from "react-slick";
import "./RestaurantPage.css";
import OderPage from "./../OrderPage/OderPage";

function RestaurantPage() {
  const params = useParams();
  var resId = params.id;

  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);

  const [restaurant, setRestaurant] = useState([]);

  const [food, setFood] = useState([]);

  const [itemsState, setItemsState] = useState({});

  const [isPopupOpen, setPopupOpen] = useState(false);

  const addToCart = async (_id) => {
    if (!user) {
      window.alert("Please Log in to your Account to Add This To Your Cart");
      return;
    }
    try {
      let itemToAdd = { _id };
      let uid = user?._id;

      const isProductInCart = itemsState[_id]?.inCart;
      console.log(isProductInCart);

      const response = await fetch(`${host}/api/auth/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid,
          itemToAdd,
          inCart: isProductInCart,
        }),
      });

      const responseData = await response.json();

      setItemsState((prevState) => ({
        ...prevState,
        [_id]: {
          ...prevState[_id],
          inCart: responseData.isAddedInCart
            ? !isProductInCart
            : isProductInCart,
        },
      }));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  useEffect(() => {
    getRestaurantDetails();
    getFoodDetails();
  }, []);

  const getRestaurantDetails = async () => {
    const result = await fetch(
      `${host}/api/res/getRestaurantDetails/${resId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: resId }),
      }
    );

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
      setRestaurant(data[0]);
    }
  };

  const getFoodDetails = async () => {
    const result = await fetch(`${host}/api/food/getFoodDetails/${resId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ resId: resId }),
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
      setFood(data);
    }
  };

  const galleryImages = restaurant
    ? [...(restaurant.resimg || []), ...(restaurant.foodimg || [])].filter(
        Boolean
      )
    : [];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  if (!restaurant) {
    return <Spinner />;
  }

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const getTitle = () => {
    switch (activeStep) {
      case 1:
        return "Overview";
      case 2:
        return restaurant.rescategory ===
          "Both, delivery and dine-in available" ||
          restaurant.rescategory === "Delivery only"
          ? "Order Online"
          : "";
      case 3:
        return "Reviews";
      case 4:
        return "Photos";
      case 5:
        return "Menu";
      case 6:
        return restaurant.rescategory ===
          "Both, delivery and dine-in available" ||
          restaurant.rescategory === "Dine-in only"
          ? "Book Table"
          : "";
      default:
        return "";
    }
  };

  return (
    <div className="main-page">
      <div className="container-lg">
        {restaurant ? (
          <div className="img_width-page">
            <Slider {...sliderSettings}>
              {galleryImages.map((image, index) => (
                <div key={index}>
                  <img
                    className="w-3/4 h-3/4 border-2 border-gray-100 mt-10 mx-36 justify-center"
                    alt={`image-${index}`}
                    src={image}
                  />
                </div>
              ))}
            </Slider>
            <div className="container mb-5 py-20 mx-auto border-2 border-gray-400">
              <div className="w-full text-gray-600 body-font border-2 border-gray-400">
                <div className="w-full container flex border-2 border-gray-400">
                  <div className="w-full border-2 border-gray-400">
                    <div className="flex flex-wrap border-2 border-gray-400">
                      <Link
                        className={`sm:px-6 px-2 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 text-xl font-semibold inline-flex items-center leading-none ${
                          activeStep === 1
                            ? "border-orange-500 text-orange-500"
                            : ""
                        }  tracking-wider rounded-t`}
                        onClick={() => setActiveStep(1)}
                      >
                        Overview
                      </Link>
                      {restaurant?.rescategory ===
                        "Both, delivery and dine-in available" ||
                      restaurant?.rescategory === "Delivery only" ? (
                        <Link
                          className={`sm:px-6 px-2 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 text-xl font-semibold inline-flex items-center leading-none ${
                            activeStep === 2
                              ? "border-orange-500 text-orange-500"
                              : ""
                          }  tracking-wider rounded-t`}
                          onClick={() => setActiveStep(2)}
                        >
                          Order Online
                        </Link>
                      ) : (
                        ""
                      )}
                      <Link
                        className={`sm:px-6 px-2 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 text-xl font-semibold inline-flex items-center leading-none ${
                          activeStep === 3
                            ? "border-orange-500 text-orange-500"
                            : ""
                        }  tracking-wider rounded-t`}
                        onClick={() => setActiveStep(3)}
                      >
                        Reviews
                      </Link>
                      <Link
                        className={`sm:px-6 px-2 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 text-xl font-semibold inline-flex items-center leading-none ${
                          activeStep === 4
                            ? "border-orange-500 text-orange-500"
                            : ""
                        }  tracking-wider rounded-t`}
                        onClick={() => setActiveStep(4)}
                      >
                        Photos
                      </Link>
                      <Link
                        className={`sm:px-6 px-2 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 text-xl font-semibold inline-flex items-center leading-none ${
                          activeStep === 5
                            ? "border-orange-500 text-orange-500"
                            : ""
                        }  tracking-wider rounded-t`}
                        onClick={() => setActiveStep(5)}
                      >
                        Menu
                      </Link>
                      {restaurant?.rescategory ===
                        "Both, delivery and dine-in available" ||
                      restaurant?.rescategory === "Dine-in only" ? (
                        <Link
                          className={`sm:px-6 px-2 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 text-xl font-semibold inline-flex items-center leading-none ${
                            activeStep === 6
                              ? "border-orange-500 text-orange-500"
                              : ""
                          }  tracking-wider rounded-t`}
                          onClick={() => setActiveStep(6)}
                        >
                          Book Table
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                    {activeStep && (
                      <div className="flex flex-col w-full py-2 border-2 border-gray-400">
                        <h1 className="text-2xl font-medium title-font text-gray-900 ml-5">
                          {getTitle()}
                        </h1>
                        <p className="leading-relaxed text-base pb-12">
                          {activeStep === 1 && (
                            <section className="text-gray-600 body-font">
                              <div className="py-10"></div>
                            </section>
                          )}
                          {activeStep === 2 && (
                            <section className="text-gray-600 body-font">
                              {food && (
                                <div className="p-5 flex flex-col">
                                  {Array.isArray(food)
                                    ? food.map((item, index) => (
                                        <div
                                          key={index}
                                          className="flex flex-row items-center justify-between mb-4 bg-gray-100 hover:bg-orange-100 border-2 hover:border-orange-200 rounded-lg"
                                        >
                                          <div className="flex flex-row items-center">
                                            <img
                                              src={item?.foodimg}
                                              className="w-36 h-36 rounded-lg m-5"
                                              alt={`food-${index}`}
                                            />
                                            <div className="ml-4 flex flex-col">
                                              <div className="text-xl font-semibold">
                                                {item?.foodname}
                                              </div>
                                              <div className="text-lg text-gray-600">
                                                Rs. {item?.foodprice}
                                              </div>
                                              <div className="text-lg text-gray-400">
                                                {item?.fooddetails}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex flex-col gap-3">
                                            {/* <button
                                              onClick={() =>
                                                addToCart(item?._id)
                                              }
                                              className="text-white font-semibold mx-5 px-4 py-2 rounded bg-green-500 hover:bg-green-600 drop-shadow-lg hover:drop-shadow-xl"
                                            >
                                              Add to Cart
                                            </button> */}

                                            <button
                                              className="text-white font-semibold mx-5 px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl"
                                              onClick={openPopup}
                                            >
                                              Order Now
                                            </button>
                                            {isPopupOpen && (
                                              <OderPage
                                                onClose={closePopup}
                                                cartItems={[
                                                  {
                                                    _id: item?._id,
                                                    name: item?.foodname,
                                                    price: item?.foodprice,
                                                    quantity: 1,
                                                  },
                                                ]}
                                              />
                                            )}
                                          </div>
                                        </div>
                                      ))
                                    : ""}
                                </div>
                              )}
                            </section>
                          )}

                          {activeStep === 3 && (
                            <section className="text-gray-600 body-font"></section>
                          )}
                          {activeStep === 4 && (
                            <div className="putmap mb-5 ">
                              {Array.isArray(restaurant)
                                ? restaurant.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex flex-row items-center justify-between mb-4 bg-gray-100 hover:bg-orange-100 border-2 hover:border-orange-200 rounded-lg"
                                    >
                                      <div className="flex flex-row items-center">
                                        <img
                                          src={item?.menuimg}
                                          className="w-36 h-36 rounded-lg m-5"
                                          alt={`food-${index}`}
                                        />
                                      </div>
                                    </div>
                                  ))
                                : ""}
                            </div>
                          )}
                          {activeStep === 5 && (
                            <div className="putmap mb-5 ">
                              <div></div>
                            </div>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <span className=" justify-center mx-auto items-center align-middle">
            <Spinner />
          </span>
        )}
      </div>
    </div>
  );
}

export default RestaurantPage;
