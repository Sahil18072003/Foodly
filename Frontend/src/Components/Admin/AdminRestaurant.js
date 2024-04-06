import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AdminRestaurant({ setModalAdminRestaurant }) {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const [restaurant, setRestaurant] = useState([]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigate = useNavigate();

  const [modalRestaurant, setModalRestaurant] = useState(false);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const openModal = (restaurant) => {
    setModalRestaurant(true);
    setSelectedRestaurant(restaurant); // assuming you have a state to store selected restaurant details
  };

  const closeModal1 = () => {
    setModalRestaurant(false);
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  const closeModal2 = () => {
    setModalAdminRestaurant(false);
  };

  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  const openConfirmationModal = (resId) => {
    setShowConfirmationModal(true);
    setRestaurantToDelete(resId);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setRestaurantToDelete(null);
  };

  const handleDeleteRestaurant = (resId) => {
    try {
      // Code to delete user from the database
      DeleteRestaurant(resId);
      // Close the confirmation modal
      closeConfirmationModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // for Admin Restaurant Data
  const getRestaurantData = async () => {
    const result = await fetch(`${host}/api/admin/getAllRestaurantDetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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
      setRestaurant(data);
    }
  };

  // for Admin Restaurant API
  const DeleteRestaurant = async (id) => {
    let delres = await fetch(`${host}/api/admin/deleteRestaurant/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    delres = await delres.json();

    if (delres) {
      // Update userlist state after successful deletion
      toast.success("Successfully deleted restaurant...", {
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

      getRestaurantData();
    } else if (!delres) {
      toast.error("Your Token has expired... Login again", {
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
      }, 2000);
    } else {
      toast.error("Sorry error occur in Restaurant delete...", {
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
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg lg:w-4/5 md:w-3/5 sm:w-3/5">
        <div className="py-3 flex bg-orange-400 rounded-t-lg">
          <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
            Restaurant Details
          </span>
          <button
            onClick={closeModal2}
            className="text-white font-bold text-xl px-6"
          >
            ✕
          </button>
        </div>
        <div className="justify-center px-8 py-6 sm:col-span-3 rounded-2xl flex flex-column bg-gray-200">
          {restaurant?.length > 0 ? (
            restaurant?.map((restaurant, index) => (
              <div
                key={restaurant._id}
                className="p-5 bg-orange-100 m-3 rounded-lg bg-white hover:bg-teal-200 border-2 hover:border-orange-300 hover:shadow-xl"
              >
                <div className="text-lg">Restaurant Id : {restaurant._id}</div>
                <div className="">Status : {restaurant.isVerified}</div>
                <button
                  onClick={() => openConfirmationModal(restaurant?._id)}
                  className="text-white font-semibold mx-10 my-3 px-4 py-2 rounded bg-orange-400 hover:bg-orange-500 drop-shadow-lg hover:drop-shadow-xl"
                >
                  Delete
                </button>
                {showConfirmationModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg lg:w-2/5 md:w-2/3 sm:w-2/3">
                      <div className="py-3 flex bg-orange-400 rounded-t-lg">
                        <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                          Confirmation
                        </span>
                      </div>
                      <div className="py-7 px-6">
                        <p className="text-xl font-large">
                          Are you sure you want to delete this Restaurant?
                        </p>
                        <div className="flex justify-center mt-8">
                          <button
                            onClick={() =>
                              handleDeleteRestaurant(restaurantToDelete)
                            }
                            className="text-white font-semibold mx-8 px-4 py-2 rounded bg-orange-400 hover:bg-orange-500 drop-shadow-lg hover:drop-shadow-xl"
                          >
                            Delete
                          </button>
                          <button
                            onClick={closeConfirmationModal}
                            className="bg-gray-300 text-gray-700 font-semibold mx-8 px-4 py-2 rounded hover:bg-gray-400 drop-shadow-lg hover:drop-shadow-xl"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => openModal(restaurant)}
                  className="text-white font-semibold mx-5 mr-6 px-4 py-2 rounded bg-orange-400 hover:bg-orange-500 drop-shadow-lg hover:drop-shadow-xl"
                >
                  Start Verification
                </button>
              </div>
            ))
          ) : (
            <div>
              <h1>No Restaurants available</h1>
            </div>
          )}
          {modalRestaurant && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg w-auto">
                <div className="mb-4 py-4 flex bg-orange-400 rounded-t-lg">
                  <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                    Restaurant Id :{" "}
                    {selectedRestaurant && selectedRestaurant._id}
                  </span>
                  <button
                    onClick={closeModal1}
                    className="text-white font-bold text-xl px-3"
                  >
                    ✕
                  </button>
                </div>
                <div className="justify-center px-20 py-6">
                  <div className="mb-4">
                    <div className="sm:col-span-3 rounded-2xl">
                      {selectedRestaurant && selectedRestaurant.resadd}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
}

export default AdminRestaurant;
