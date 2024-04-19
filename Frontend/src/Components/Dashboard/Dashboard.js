import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Dashboard.css";

function Dashboard() {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState([]);

  const [modalRestaurant, setModelRestaurant] = useState(false);

  const openModal = () => {
    restaurant
      ? setModelRestaurant(true)
      : toast.error("You are not registered for the restaurant.", {
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

  const closeModal1 = () => {
    setModelRestaurant(false);
  };

  useEffect(() => {
    document.title = "Dashboard | Foodly";
  }, []);

  const userUpdate = (userId) => {
    navigate(`/dashboard/updateProfile/${userId}`);
  };

  const userRestaurantPage = (resId) => {
    navigate(`/dashboard/resDashboard/${resId}`);
  };

  const updateRestaurantDetails = (resId) => {
    const selectedRestaurant = restaurant.find((res) => res._id === resId);

    if (
      selectedRestaurant?.isrespagecreated === "false" &&
      selectedRestaurant?.isrespagecreated === "" &&
      selectedRestaurant?.isdocverified === "false" &&
      selectedRestaurant?.isdocverified === "" &&
      selectedRestaurant?.isbankdetailsverified === "false" &&
      selectedRestaurant?.isbankdetailsverified === ""
    ) {
      toast.error("Your verification is pending.", {
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
        navigate(`/addRestaurant/addForm/1?${resId}`);
      }, 2000);
    } else {
      toast.success("Your verification already done.", {
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

  const registerDelivery = (resId) => {
    const selectedRestaurant = restaurant.find((res) => res._id === resId);

    if (
      selectedRestaurant?.isrespagecreated === "true" &&
      selectedRestaurant?.isdocverified === "true" &&
      selectedRestaurant?.isbankdetailsverified === "false" &&
      selectedRestaurant?.isactivedelivery === "false" &&
      selectedRestaurant?.isactivedelivery === ""
    ) {
      toast.error("Your activation of delivery pending.", {
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
        navigate(`/addRestaurant/addForm/4?${resId}`);
      }, 2000);
    } else {
      toast.error("Your partnership is pending", {
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

  const addFood = (resId) => {
    const selectedRestaurant = restaurant.find((res) => res._id === resId);

    if (
      selectedRestaurant?.isrespagecreated === "true" &&
      selectedRestaurant?.isdocverified === "true" &&
      selectedRestaurant?.isactivedelivery === "true" &&
      selectedRestaurant?.ismenudigitisation === "true" &&
      selectedRestaurant?.isbankdetailsverified === "true" &&
      selectedRestaurant?.ispartnership === "true"
    ) {
      toast.error("Your verification is pending.", {
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
        navigate(`/dashboard/resDashboard/${resId}`);
      }, 2000);
    } else {
      toast.error("Your partnership is pending", {
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

  useEffect(() => {
    getOwnerRestaurnts();
  }, []);

  const getOwnerRestaurnts = async () => {
    const result = await fetch(
      `${host}/api/res/getOwnerRestaurnts/${user?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ownerid: user?._id }),
      }
    );

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

  return (
    <div className="dashboard-page">
      <div className="dashboard-title">Your Account</div>
      <div className="flex flex-column w-4/5 py-8">
        <div onClick={() => userUpdate(user?._id)} className="profile-part">
          <img
            src={require(`../../assets/Dashboard/profile.jpg`)}
            alt=""
            srcSet=""
          />
          <div className="dash-card-content">
            <h6 className="card-head">Your Profile</h6>
            <p className="card-para">
              Profile details, Update details, Add Profile photo
            </p>
          </div>
        </div>

        <div
          onClick={() => {
            openModal();
          }}
          className="profile-part"
        >
          <img
            src={require(`../../assets/Dashboard/Respage.jpg`)}
            alt=""
            srcSet=""
          />
          <div className="dash-card-content">
            <h6 className="card-head">Your Restaurant Page</h6>
            <p className="card-para">
              Your Restaurants details, Update details, Add food items
            </p>
          </div>
        </div>

        {modalRestaurant && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg lg:w-5/6 h-5/6 md:w-4/5 sm:w-3/5">
              <div className="py-4 flex bg-orange-400 rounded-t-lg">
                <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                  Your Restaurants Details
                </span>
                <button
                  onClick={closeModal1}
                  className="text-white font-bold text-xl pr-6"
                >
                  ✕
                </button>
              </div>
              <div className="sm:col-span-3 rounded-lg justify-center p-6">
                <section className="text-gray-600 body-font overflow-y-scroll block max-h-[470px]">
                  <div className="flex flex-wrap container">
                    {restaurant &&
                      restaurant
                        .filter(
                          (res) =>
                            res.isrespagecreated === "true" &&
                            res.isdocverified === "true" &&
                            res.isactivedelivery === "true" &&
                            res.ismenudigitisation === "true" &&
                            res.isbankdetailsverified === "true" &&
                            res.ispartnership === "true"
                        )
                        .map((res, index) => (
                          <div
                            key={index}
                            className="px-16 py-3 w-full md:w-1/2 lg:w-1/2 flex flex-col justify-between"
                          >
                            <div className="bg-orange-100 border-2 border-orange-400 hover:border-orange-400 hover:scale-105 border shadow-xl bg-opacity-75 rounded-lg overflow-hidden text-center relative">
                              <div className="img-container">
                                {Array.isArray(res?.resimg) ? (
                                  <div className="slider-container">
                                    {res?.resimg.map((imgUrl, index) => (
                                      <img
                                        key={index}
                                        src={imgUrl}
                                        alt={`Restaurant ${index + 1}`}
                                        className="slider-img rounded-t-lg"
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <img
                                    src={res?.resimg}
                                    alt="Hold"
                                    className="rounded-t-lg"
                                  />
                                )}
                              </div>
                              <div className="p-3">
                                <h1 className="text-2xl font-medium text-gray-900 mb-2">
                                  ResId : {res?._id}
                                </h1>
                                <h2 className="text-md font-medium text-orange-400">
                                  Restaurant Name : {res?.resname}
                                </h2>
                                <h2 className="text-md font-medium text-gray-600 mb-2">
                                  Restaurant Address : {res?.resadd}
                                </h2>
                                <p className="text-md font-medium text-gray-500 mb-2">
                                  Restaurant Category : {res?.rescategory}
                                </p>
                                <p className="text-md font-medium text-gray-400 mb-2">
                                  Restaurant Type :{" "}
                                  {Array.isArray(res?.restypes)
                                    ? res?.restypes.join(", ")
                                    : res?.restypes}
                                </p>
                              </div>
                              <div className="flex justify-center items-end w-full">
                                <button
                                  className="flex text-black font-medium btn-txt bg-orange-400 border-0 mb-6 px-10 py-2 focus:outline-none hover:bg-orange-500 rounded text-lg drop-shadow-xl"
                                  onClick={() => userRestaurantPage(res?._id)}
                                >
                                  Show and Add food
                                </button>
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
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-title"> Track Your Restaurant request</div>
      <div className="main-track-1">
        {Array.isArray(restaurant) && restaurant.length > 0 ? (
          <div className="track-request">
            {restaurant.map((res, index) => (
              <div className="track-sub-request" key={res?._id}>
                <div>
                  {res?.isrespagecreated &&
                  res?.isactivedelivery &&
                  res?.isdocverified &&
                  res?.ismenudigitisation &&
                  res?.isbankdetailsverified &&
                  res?.ispartnership ? (
                    res?.isrespagecreated === "true" &&
                    res?.isactivedelivery === "true" &&
                    res?.isdocverified === "true" &&
                    res?.ismenudigitisation === "true" &&
                    res?.isbankdetailsverified === "true" &&
                    res?.ispartnership === "true" ? (
                      <span className="text-green-700 bg-green-100 m-2 py-2 px-4 font-bold rounded-md">
                        Verification Success
                      </span>
                    ) : (
                      <span className="text-red-500 bg-red-100 m-2 py-2 px-4 font-bold rounded-md">
                        Verification Failed
                      </span>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-xl font-bold p-2">Res ID : {res?._id}</div>
                <div className="text-lg p-2">{res?.resadd}</div>
                <div className="main-track">
                  <div className="track-part">
                    <div className="line-white"></div>
                    <div className="circle">
                      {res?.isrespagecreated ? (
                        res?.isrespagecreated === "true" ? (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/right.jpg`)}
                            alt="Right"
                          />
                        ) : (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/cross.png`)}
                            alt="Cross"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="line"></div>
                  </div>

                  <div className="track-part">
                    <div className="line"></div>
                    <div className="circle">
                      {res?.isdocverified ? (
                        res?.isdocverified === "true" ? (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/right.jpg`)}
                            alt="Right"
                          />
                        ) : (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/cross.png`)}
                            alt="Right"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="line"></div>
                  </div>
                  <div className="track-part">
                    <div className="line"></div>
                    <div className="circle">
                      {res?.isactivedelivery ? (
                        res?.isactivedelivery === "true" ? (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/right.jpg`)}
                            alt="Right"
                          />
                        ) : (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/cross.png`)}
                            alt="Right"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="line"></div>
                  </div>
                  <div className="track-part">
                    <div className="line"></div>
                    <div className="circle">
                      {res?.ismenudigitisation ? (
                        res?.ismenudigitisation === "true" ? (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/right.jpg`)}
                            alt="Right"
                          />
                        ) : (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/cross.png`)}
                            alt="Right"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="line"></div>
                  </div>
                  <div className="track-part">
                    <div className="line"></div>
                    <div className="circle">
                      {res?.isbankdetailsverified ? (
                        res?.isbankdetailsverified === "true" ? (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/right.jpg`)}
                            alt="Right"
                          />
                        ) : (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/cross.png`)}
                            alt="Right"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="line"></div>
                  </div>
                  <div className="track-part">
                    <div className="line"></div>
                    <div className="circle">
                      {res?.ispartnership ? (
                        res?.ispartnership === "true" ? (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/right.jpg`)}
                            alt="Right"
                          />
                        ) : (
                          <img
                            className="rounded-full"
                            src={require(`./../../assets/Restaurant/cross.png`)}
                            alt="Right"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="line-white"></div>
                  </div>
                </div>
                <div className="w-full text-center px-2 flex flex-column">
                  <div className="w-1/6">
                    Foodly page <br /> creation
                  </div>
                  <div className="w-1/6">
                    Documents &<br /> proofs <br /> verification
                  </div>
                  <div className="w-1/6">
                    Delivery <br />
                    activation
                  </div>
                  <div className="w-1/6">Menu digitisation</div>
                  <div className="w-1/6">
                    Bank details <br />
                    validation
                  </div>
                  <div className="w-1/6">Partnership Done</div>
                </div>
                <div className="w-full p-2 flex flex-column">
                  <div className="w-1/3 border-2 border-orange-400 m-2 rounded-md">
                    <img
                      src={require(`../../assets/Dashboard/page.jpg`)}
                      alt=""
                      className="track-img"
                    />
                    <div className="p-4">
                      <div className="img-first-content">
                        Create your restaurant page
                      </div>
                      {res?.isdocverified === "true" &&
                      res?.isbankdetailsverified === "true" &&
                      res?.isrespagecreated === "true" ? (
                        <div className="img-second-content text-green">
                          verifcation done
                        </div>
                      ) : (
                        <div className="img-second1-content text-red">
                          verifcation pending
                        </div>
                      )}
                      <button
                        className="track-button"
                        onClick={() => updateRestaurantDetails(res?._id)}
                      >
                        Update Details
                      </button>
                    </div>
                  </div>
                  <div className="w-1/3 border-2 border-orange-400 m-2 rounded-md">
                    <img
                      src={require(`../../assets/Dashboard/boy.jpg`)}
                      alt=""
                      className="track-img"
                    />
                    <div className="p-4">
                      <div className="img-first-content">
                        Register for online ordering
                      </div>
                      {res?.isactivedelivery === "true" &&
                      res?.ismenudigitisation === "true" &&
                      res?.isbankdetailsverified === "true" ? (
                        <div className="img-second-content text-green">
                          Information complete
                        </div>
                      ) : (
                        <div className="img-second1-content text-red">
                          Information incomplete
                        </div>
                      )}
                      <button
                        className="track-button"
                        onClick={() => registerDelivery(res?._id)}
                      >
                        Complete now
                      </button>
                    </div>
                  </div>
                  <div className="w-1/3 border-2 border-orange-400 m-2 rounded-md">
                    <img
                      src={require(`../../assets/Dashboard/dine.jpg`)}
                      alt=""
                      className="track-img"
                    />
                    <div className="p-4">
                      <div className="img-first-content">
                        Add food on your page
                      </div>
                      {res?.isdocverified === "true" &&
                      res?.isdocverified === "true" &&
                      res?.isactivedelivery === "true" &&
                      res?.ismenudigitisation === "true" &&
                      res?.isbankdetailsverified === "true" &&
                      res?.ispartnership === "true" ? (
                        <div className="img-second-content text-green">
                          Partnership Done
                        </div>
                      ) : (
                        <div className="img-second1-content text-red">
                          Partnership Incomplete
                        </div>
                      )}
                      <button
                        className="track-button"
                        onClick={() => addFood(res?._id)}
                      >
                        Add Food
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-center w-full my-4">
            No restaurants available
          </p>
        )}
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

export default Dashboard;
