import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const navigate = useNavigate();

  const userUpdate = () => {
    navigate(`/dashboard/updateProfile/${user?.userId}`);
  };

  useEffect(() => {
    document.title = "UpdateProfile | Foodly";
  }, []);

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
