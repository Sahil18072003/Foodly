import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HowWork = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="flex flex-wrap">
        <div className="container px-5 py-12 mx-auto">
          <div className="lg:w-1/2 w-full mb-6">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              How It Works!
            </h1>
            <div className="h-1 w-20 bg-orange-400 rounded"></div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto  pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-indigo-500 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-12 h-12"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-600 text-lg title-font font-medium">
                Step 1:{" "}
              </h2>
              <h2 className="text-gray-900 text-xl title-font font-medium mb-2">
                Browse and Select Your Dish
              </h2>
              <p className="leading-relaxed text-base">
                Explore various cuisines and dishes, select your favorite, and
                customize your order as needed.
              </p>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto  pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-indigo-500 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="sm:w-16 sm:h-16 w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-600 text-lg title-font font-medium ">
                Step 2:
              </h2>
              <h2 className="text-gray-900 text-xl title-font font-medium mb-2">
                Place Your Order and Payment
              </h2>
              <p className="leading-relaxed text-base">
                Proceed to checkout, make secure payment, and track your order
                status in real-time.
              </p>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-indigo-500 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="sm:w-16 sm:h-16 w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-600 text-lg title-font font-medium ">
                Step 3:
              </h2>
              <h2 className="text-gray-900 text-xl title-font font-medium mb-2">
                Enjoy Your Meal in 15-20 Minutes
              </h2>
              <p className="leading-relaxed text-base">
                Sit back, relax, and await your delicious meal to arrive at your
                doorstep within minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWork;
