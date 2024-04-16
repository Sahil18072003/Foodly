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

  useEffect(() => {
    document.title = "Dashboard | Foodly";
  }, []);

  const userUpdate = (userId) => {
    navigate(`/dashboard/updateProfile/${userId}`);
  };

  const userRestaurantPage = (userId) => {
    // if (restaurant && restaurant.ownerid === userId) {
    navigate(`/dashboard/resDashboard/${userId}`);
    // } else {
    //   toast.error("You are not registered for a restaurant.", {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     rtl: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
  };

  useEffect(() => {
    getOwnerRestaurnts();
  }, []);

  const updateRestaurantDetails = async (resId) => {
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
      navigate(`/addRestaurant/addForm/1?resId=${resId}`);
    }
  };

  const registerDelivery = (resId) => {
    navigate(`/addRestaurant/addForm/4?resId=${resId}`);
  };

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
          onClick={() => userRestaurantPage(user?._id)}
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
              Restaurant details, Update details, Add food
            </p>
          </div>
        </div>
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
                      {res?.isdocverified ? (
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
                      <div className="img-second-content">
                        Information Incomplete
                      </div>
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
                        Get more dine-in customers
                      </div>
                      <div className="img-second-content">
                        Registration not started
                      </div>
                      <button className="track-button">Start now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No restaurants available</div>
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
