import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";
import "./AddForm.css";

function AddForm2() {
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
          <div className="add-second-part">
            <div className="text-5xl">Restaurant Type & Timings</div>
            {/* forth part */}
            <div className="add-right-forth p-4 rounded-lg">
              <div className="p-3">
                <div className="text-2xl font-semibold">Establishment type</div>
                <div className="text-sm">
                  Select most relevant category for your restaurant type
                </div>
              </div>
              <div className="p-3">
                <div className="p-2">
                  <div className="flex flex-cloumn gap-3">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="HTML"
                    />
                    <label htmlFor="html" className="text-lg">
                      Both, delivery and dine-in available
                    </label>
                  </div>
                  <div className="ml-6 text-sm">
                    Select this option when you have a place for customers to
                    dine-in and also want to activate online ordering for your
                    restaurant
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex flex-cloumn gap-3">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="HTML"
                    />
                    <label htmlFor="html" className="text-lg">
                      Dine-in only
                    </label>
                  </div>
                  <div className="ml-6 text-sm">
                    Select when you don't want to register for online ordering
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex flex-cloumn gap-3">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="HTML"
                    />
                    <label htmlFor="html" className="text-lg">
                      Delivery only
                    </label>
                  </div>
                  <div className="ml-6 text-sm">
                    Select when you don't have a facility for customers to
                    dine-in (like delivery kitchens)
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-lg">
                  Select options which best describe your outlet
                </div>
                <div className="pt-4 flex flex-column">
                  <div className="w-1/3">
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Bakery</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Casual Dining</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Quick Bites</label>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Beverage Shop</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Dessert Parlour</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Sweet Shop</label>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Cafe</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Food Court</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Club</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* fifth part */}
            <div className="add-right-fifth p-4 rounded-lg">
              <div className="p-3">
                <div className="text-2xl font-semibold">Type of cuisines</div>
                <div className="text-sm">
                  Select options which best describe food your serve
                </div>
              </div>
              <div className="p-3">
                <div className="pt-2 flex flex-column">
                  <div className="w-1/3">
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Beverages</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Desserts</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>South Indian</label>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Biryani</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Fast Food</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Street Food</label>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Chinese</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>North Indian</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label>Coffee</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* sixth part */}
            <div className="add-right-sixth p-4 rounded-lg">
              <div className="p-3">
                <div className="text-2xl font-semibold">
                  Restaurant operational hours
                </div>
                <div className="text-sm">
                  Mark restaurant opening and closing hours
                </div>
              </div>
              <div className="p-1 flex flex-column gap-2">
                <div className="p-2">
                  <div className="p-2">Opens at</div>
                  <div className="border-2 border-gray-300 rounded py-4 px-16"></div>
                </div>
                <div className="p-2">
                  <div className="h-1/2"></div>
                  <div className="h-1/2 py-4 px-8">to</div>
                </div>
                <div className="p-2">
                  <div className="p-2">Closes at</div>
                  <div className="border-2 border-gray-300 rounded py-4 px-16"></div>
                </div>
              </div>
              <div className="p-2">
                <div className="">
                  <div className="text-xl">Mark open days</div>
                  <div className="text-xs">
                    Don’t forget to uncheck your off-day
                  </div>
                </div>
                <div className="pt-4 flex flex-column">
                  <div className="w-1/3">
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                        defaultChecked
                      />
                      <label>Monday</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                        defaultChecked
                      />
                      <label>Tuesday</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                        defaultChecked
                      />
                      <label>Wednesday</label>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                        defaultChecked
                      />
                      <label>Thursday</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                        defaultChecked
                      />
                      <label>Friday</label>
                    </div>
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                        defaultChecked
                      />
                      <label>Saturday</label>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-row gap-3 p-2">
                      <input
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        value="HTML"
                        defaultChecked
                      />
                      <label>Sunday</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="add-footer">
        <ul className="md:flex md:p-0 absolute md:static w-full md:w-auto transition-all duration-500 ease-in align-middle justify-center items-center gap-20">
          <li className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
            <Link
              className="text-white-900 duration-500"
              to="/addRestaurant/addForm/1"
            >
              Back
            </Link>
          </li>

          <li className="md:ml-8 text-md font-semibold md:my-0 bg-orange-400 px-10 py-2 rounded-md shadow-md hover:shadow-lg">
            <Link
              className="text-gray-800 duration-500"
              to="/addRestaurant/addForm/3"
            >
              Next
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddForm2;
