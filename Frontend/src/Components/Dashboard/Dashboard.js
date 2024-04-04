import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard | Foodly";
  }, []);

  const userUpdate = () => {
    navigate(`/dashboard/updateProfile/${user?._id}`);
  };

  return (
    <div className="dashboard-page">
      {user ? (
        <>
          <div className="profile-part">
            <div className="profile-right">
              <img
                alt="ecommerce"
                className="user-img"
                src={require(`../../assets/Devlopers/User.png`)}
              />
              <h2 id="user-name">Hello! {user?.username}</h2>
            </div>
            <div>
              <button onClick={userUpdate} className="btn-profile-txt">
                Edit Profile
              </button>
            </div>
          </div>
          <div className="res-part">
            <div>Restaurant Data / Chat Data</div>
          </div>
        </>
      ) : (
        <>
          <div>
            <img
              alt="ecommerce"
              className="user-img"
              src={require(`../../assets/Devlopers/User.png`)}
            />
            <h2 id="user-name">Hello! {user?.username}</h2>
          </div>
          <div>
            <button className="btn-txt">Edit Profile</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
