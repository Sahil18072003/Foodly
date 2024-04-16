import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ShowRestaurant.css";

const ShowRestaurant = () => {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState([]);

  const addFood = (resId) => {
    navigate();
  };

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
    <div className="adminDaskbordcontainer">
      {restaurant
        ? restaurant.map((res, index) => (
            <div className="box box1" key={index}>
              <h1>{res?.resname}</h1>
              <p>{res?._id}</p>
              <button onClick={addFood(res?._id)}>Add Food</button>
            </div>
          ))
        : ""}
    </div>
  );
};

export default ShowRestaurant;
