import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ShowRestaurant.css";

const ShowRestaurant = () => {
  const params = useParams();
  var resId = params.id;

  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    getRestaurantDetails();
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
    <div className="main-show-page">
      <div className="adminDaskbordcontainer">
        <div className="text-3xl font-bold text-center">
          Restaurant Id : {restaurant?._id}
        </div>
        <div className="table-container">
          <table className="table-fixed justify-center shadow-xl bg-white overflow-y-scroll block w-fit-content h-full">
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
      </div>
    </div>
  );
};

export default ShowRestaurant;
