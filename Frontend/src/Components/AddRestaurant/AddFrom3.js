import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";
import "./AddForm.css";

function AddForm3() {
  useEffect(() => {
    document.title = "Add Form | Foodly";
  }, []);

  return (
    <div className="add-res-page">
      <div className="add-res-content">
        <div className="add-left">
          <div className="add-left-first py-4 px-4 rounded-lg">
            <div className="font-bold text-lg">
              1. Create your restaurant page
            </div>
            <hr />
            <button className="py-2 border-2 border-gray-900">
              <Link to="/addRestaurant/addForm/1">
                <div className="flex flex-column">
                  <div className="w-1/6 border-2 border-gray-900 rounded-full p-1 my-4">
                    <FontAwesomeIcon icon={fa1} />
                  </div>
                  <div className="w-5/6 p-1">
                    <div className="add-left-text">Restaurant Information</div>
                    <div className="add-left-sub-text">
                      Restaurant name, address, contact no., owner details
                    </div>
                  </div>
                </div>
              </Link>
            </button>
            <button className="py-2 border-2 border-gray-900">
              <Link to="/addRestaurant/addForm/2">
                <div className="flex flex-column">
                  <div className="w-1/6 border-2 border-gray-900 rounded-full p-1 my-4">
                    <FontAwesomeIcon icon={fa2} />
                  </div>
                  <div className="w-5/6 p-1">
                    <div className="add-left-text">Restaurant Type & Time</div>
                    <div className="add-left-sub-text">
                      Establishment & cuisine type, opening hours
                    </div>
                  </div>
                </div>
              </Link>
            </button>
            <button className="pt-2 pb-1 border-2 border-gray-900">
              <Link to="/addRestaurant/addForm/3">
                <div className="flex flex-column">
                  <div className="w-1/6 border-2 border-gray-900 rounded-full p-1 my-1">
                    <FontAwesomeIcon icon={fa3} />
                  </div>
                  <div className="w-5/6">
                    <div className="add-left-text">Upload Images</div>
                    <div className="add-left-sub-text">
                      Menu, restaurant, food images
                    </div>
                  </div>
                </div>
              </Link>
            </button>
          </div>
          <div className="add-left-second p-4 rounded-lg">
            <span className="font-bold text-lg">
              2. Register for Online ordering
            </span>
          </div>
        </div>
        <div className="add-right">
          <div className="add-third-part">
            <div className="text-5xl">Upload images</div>
            {/* seventh part */}
            <div className="add-right-seven pb-3 rounded-lg">
              <div className="w-4/5 py-2 px-6">
                <div className="text-2xl">Menu images</div>
                <div className="text-sm">
                  Your menu will be directly visible to customers on Zomato
                </div>
              </div>
              <div className="flex flex-column">
                <div className="w-4/5 py-4 px-6">
                  <label htmlFor="email" className="label-text">
                    Restaurant Owner Contact:
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="reslandline"
                    id="reslandline"
                    name="reslandline"
                    className="input-field"
                    // value={creditial.email}
                    // {...register("email", {
                    //   required: "Email is required",
                    //   pattern: {
                    //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                    //     message: "Email is not valid",
                    //   },
                    // })}
                    // onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {/* {errors.email?.message} */}
                  </p>
                </div>
                <div className="w-1/5 text-md font-semibold mt-11 mb-4 mr-6 bg-orange-400 border-2 border-orange-400 px-5 py-2 rounded-md shadow-md hover:shadow-lg">
                  <Link
                    className="text-white-800 duration-500 text-middle"
                    to="/login"
                  >
                    <span className="ml-5">Verify</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* eight part */}
            <div className="add-right-eight pb-3 rounded-lg">
              <div className="w-4/5 py-2 px-6">
                <div className="text-2xl">Menu images</div>
                <div className="text-sm">
                  Your menu will be directly visible to customers on Zomato
                </div>
              </div>
              <div className="flex flex-column">
                <div className="w-4/5 py-4 px-6">
                  <label htmlFor="email" className="label-text">
                    Restaurant Owner Contact:
                    <span className="text-red-600 text-lg"> *</span>
                  </label>
                  <input
                    type="reslandline"
                    id="reslandline"
                    name="reslandline"
                    className="input-field"
                    // value={creditial.email}
                    // {...register("email", {
                    //   required: "Email is required",
                    //   pattern: {
                    //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                    //     message: "Email is not valid",
                    //   },
                    // })}
                    // onChange={onChange}
                    autoComplete="false"
                  />
                  <p className="text-sm text-red-500 absolute">
                    {/* {errors.email?.message} */}
                  </p>
                </div>
                <div className="w-1/5 text-md font-semibold mt-11 mb-4 mr-6 bg-orange-400 border-2 border-orange-400 px-5 py-2 rounded-md shadow-md hover:shadow-lg">
                  <Link
                    className="text-white-800 duration-500 text-middle"
                    to="/login"
                  >
                    <span className="ml-5">Verify</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="add-footer">
        <div className="md:flex md:p-0 absolute md:static w-full md:w-auto transition-all duration-500 ease-in align-middle justify-center items-center gap-20">
          <div className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
            <Link
              className="text-white-900 duration-500"
              to="/addRestaurant/addForm/2"
            >
              Back
            </Link>
          </div>

          <div className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
            <Link className="text-gray-800 duration-500" to="/addRestaurant">
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddForm3;
