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
  console.log(restaurant);

  const addFood = (resId) => {
    navigate();
  };

  useEffect(() => {
    getRestaurantDetails();
  }, []);

  const getRestaurantDetails = async (resId) => {
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

  const isImageURL = (url) => {
    if (Array.isArray(url)) {
      return url.every((item) => {
        return (
          typeof item === "string" &&
          (item.startsWith("http") ||
            item.endsWith(".jpg") ||
            item.endsWith(".jpeg") ||
            item.endsWith(".png"))
        );
      });
    } else if (typeof url === "string") {
      return (
        url.startsWith("http") ||
        url.endsWith(".jpg") ||
        url.endsWith(".jpeg") ||
        url.endsWith(".png")
      );
    }
    return false;
  };

  return (
    <div className="adminDaskbordcontainer">
      <div className="text-orange-400 font-2xl">
        Restaurant Id : {restaurant?._id}
      </div>
      <table className="table-fixed justify-center shadow-xl block h-auto w-full">
        <thead className="bg-orange-400 rounded-md text-white shadow-md text-lg font-medium">
          <tr>
            <th className="border border-slate-300 px-4 py-2 text-white">
              Sr No.
            </th>
            <th className="border border-slate-300 px-4 py-2 text-white">
              Properties
            </th>
            <th className="border border-slate-300 px-4 py-2 text-white">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="text-center px-5 mx-10">
          {Object.entries(restaurant).map(([key, value], index) => (
            <tr key={index}>
              <td className="border border-slate-300 p-4 text-lg">
                {index + 1}
              </td>
              <td className="border border-slate-300 p-4 text-lg">{key}</td>
              <td className="border border-slate-300 p-4 text-lg">
                {Array.isArray(value) ? (
                  <div>
                    {value.map((item, i) => (
                      <div key={i}>
                        {isImageURL(item) ? (
                          <img
                            src={item}
                            alt={`${key}-${i}`}
                            style={{
                              Width: "80px",
                              Height: "80px",
                            }}
                          />
                        ) : (
                          <div>{item}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : isImageURL(value) ? (
                  <img
                    src={value}
                    alt={key}
                    style={{
                      Width: "80px",
                      Height: "80px",
                    }}
                  />
                ) : (
                  <div>{value}</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowRestaurant;
