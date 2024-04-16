import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./ResDashboard.css";
import AddFood from "./../AddFood/AddFood.js";
import ShowRestaurant from "./ShowRestaurant.js";

const ResDashboard = () => {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="main-page">
      <div className="flex relative">
        <div className="w-1/6 text-gray-200 body-font bg-orange-400">
          <div className="h-[40.5rem] flex flex-wrap sticky top-20">
            <div className=" px-7  w-full overflow-hidden">
              <div className="py-5">
                <div className="my-3 text-xl font-bold px-4">Dashbord</div>
                <div
                  className={`${
                    activeStep === 1
                      ? "text-teal-500 bg-gray-100 rounded-sm hover:text-teal-600"
                      : " "
                  } py-3 cursor-pointer hover:text-white font-bold px-4`}
                  onClick={() => setActiveStep(1)}
                >
                  Show Restaurants
                </div>
                <div
                  className={`${
                    activeStep === 2
                      ? "text-teal-500 bg-gray-100 rounded-sm hover:text-teal-600"
                      : " "
                  } py-3 cursor-pointer hover:text-white font-bold px-4`}
                  onClick={() => setActiveStep(2)}
                >
                  Add Food
                </div>
                <div
                  className={`${
                    activeStep === 3
                      ? "text-teal-500 bg-gray-100 rounded-sm hover:text-teal-600"
                      : " "
                  } py-3 cursor-pointer hover:text-white font-bold px-4`}
                  onClick={() => setActiveStep(3)}
                >
                  Show & Update Food
                </div>
                <div
                  className={`${
                    activeStep === 4
                      ? "text-teal-500 bg-gray-100 rounded-sm hover:text-teal-600"
                      : " "
                  } py-3 cursor-pointer hover:text-white font-bold px-4`}
                  onClick={() => setActiveStep(4)}
                >
                  Show Orders
                </div>
                <div
                  className={`${
                    activeStep === 5
                      ? "text-teal-500 bg-gray-100 rounded-sm hover:text-teal-600"
                      : " "
                  } py-3 cursor-pointer hover:text-white font-bold px-4`}
                  onClick={() => {
                    setActiveStep(5);
                  }}
                >
                  Reviews and Ratings
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-5/6 bg-gray-100">
          <div>
            <div className=" bg-gray-100">
              {activeStep === 1 && <ShowRestaurant />}

              {activeStep === 2 && <AddFood />}

              {activeStep === 3}
            </div>
          </div>
        </div>
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
};

export default ResDashboard;
