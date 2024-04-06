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

  const userUpdate = () => {
    navigate(`/dashboard/updateProfile/${user?._id}`);
  };

  const userRestaurantPage = () => {
    navigate(`/dashboard/restaurantPage/${user?._id}`);
  };

  useEffect(() => {
    getRestaurnt();
  }, []);

  const getRestaurnt = async () => {
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
        autoClose: 5000,
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
      }, 5000);
    } else {
      setRestaurant(data);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-title">Your Account</div>
      <div className="flex flex-column w-4/5 py-8">
        <div onClick={userUpdate} className="profile-part">
          <img
            src={require(`../../assets/Dashboard/profile.jpg`)}
            alt=""
            srcSet=""
          />
          <div className="dash-card-content">
            <h6 className="card-head">Your Profile</h6>
            <p className="card-para">Update details, Add Profile photo</p>
          </div>
        </div>
        <div onClick={userRestaurantPage} className="profile-part">
          <img
            src={require(`../../assets/Dashboard/Respage.jpg`)}
            alt=""
            srcSet=""
          />
          <div className="dash-card-content">
            <h6 className="card-head">Your Restaurant Page</h6>
            <p className="card-para">Restaurant Details</p>
          </div>
        </div>
      </div>

      <div className="dashboard-title"> Track Your Restaurant request</div>
      <div className="main-track-1">
        {Array.isArray(restaurant) && restaurant.length > 0 ? (
          <div className="track-request">
            {restaurant.map((res, index) => (
              <div className="track-sub-request" key={res?._id}>
                <div>{res?.isVerified}</div>
                <div className="text-xl font-bold p-2">Res ID : {res?._id}</div>
                <div className="text-lg p-2">{res?.resadd}</div>
                <div className="main-track">
                  <div className="track-part">
                    <div className="line-white"></div>
                    <div className="circle">
                      <img
                        className="rounded-full"
                        src={require(`./../../assets/Restaurant/right.webp`)}
                      />
                    </div>
                    <div className="line"></div>
                  </div>
                  <div className="track-part">
                    <div className="line"></div>
                    <div className="circle"></div>
                    <div className="line"></div>
                  </div>
                  <div className="track-part">
                    <div className="line"></div>
                    <div className="circle"></div>
                    <div className="line"></div>
                  </div>
                  <div className="track-part">
                    <div className="line"></div>
                    <div className="circle"></div>
                    <div className="line"></div>
                  </div>
                  <div className="track-part">
                    <div className="line"></div>
                    <div className="circle"></div>
                    <div className="line"></div>
                  </div>
                  <div className="track-part">
                    <div className="line"></div>
                    <div className="circle"></div>
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
                  <div className="w-1/6">
                    Restaurant Page <br /> ready
                  </div>
                </div>
                <div className="w-full border-2 border-orange-400 p-2 flex flex-column">
                  <div className="w-1/3 border-2 border-orange-400 m-2 rounded-md">
                    <img
                      src={require(`../../assets/Dashboard/page.jpg`)}
                      className="track-img"
                    />
                    <div className="p-4">
                      <div className="img-first-content">
                        Create your restaurant page
                      </div>
                      <div className="img-second-content">verifcation</div>
                      <button className="track-button">Update Details</button>
                    </div>
                  </div>
                  <div className="w-1/3 border-2 border-orange-400 m-2 rounded-md">
                    <img
                      src={require(`../../assets/Dashboard/boy.jpg`)}
                      className="track-img"
                    />
                    <div className="p-4">
                      <div className="img-first-content">
                        Register for online ordering
                      </div>
                      <div className="img-second-content">
                        Information Incomplete
                      </div>
                      <button className="track-button">Complete now</button>
                    </div>
                  </div>
                  <div className="w-1/3 border-2 border-orange-400 m-2 rounded-md">
                    <img
                      src={require(`../../assets/Dashboard/dine.jpg`)}
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
    </div>
  );
}

export default Dashboard;
