import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AdminRestaurant({ setModalAdminRestaurant }) {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const [restaurant, setRestaurant] = useState([]);
  console.log(restaurant);

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

  const arry = [];
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg h-5/6 lg:w-5/6 md:w-4/5 sm:w-3/5">
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
        <div className="justify-center px-8 py-6 sm:col-span-3 flex flex-wrap overflow-y-scroll bg-gray-200 w-full">
          {restaurant?.length > 0 ? (
            restaurant?.map((res, index) => (
              <div
                key={res?._id}
                className="p-3 bg-orange-100 m-3 w-1/2 rounded-lg bg-white hover:bg-teal-200 border-2 hover:border-orange-300 hover:shadow-xl"
              >
                <div className="text-lg">
                  <div className="font-bold">Restaurant Id : {res?._id}</div>
                </div>
                <div className="text-lg">
                  <div className="font-bold">
                    Restaurant Category : {res?.rescategory}
                  </div>
                </div>
                <div className="text-lg">
                  <div className="font-bold">Status : {res?.isVerified}</div>
                </div>
                <button
                  onClick={() => openConfirmationModal(res?._id)}
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
                  onClick={() => openModal(res)}
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
              <div className="bg-white rounded-lg w-5/6 h-5/6">
                <div className="mb-4 py-4 flex bg-orange-400 rounded-t-lg">
                  <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                    Restaurant Id :{" "}
                    {selectedRestaurant && selectedRestaurant?._id}
                  </span>
                  <button
                    onClick={closeModal1}
                    className="text-white font-bold text-xl px-6"
                  >
                    ✕
                  </button>
                </div>
                <div className="justify-center px-16 py-6">
                  <table className="table-fixed justify-center shadow-xl overflow-y-scroll block h-[460px] w-full">
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
                        <th className="border border-slate-300 px-4 py-2 text-white">
                          Operations
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center px-5 mx-10">
                      {Object.entries(selectedRestaurant).map(
                        ([key, value], index) => (
                          <tr key={index}>
                            <td className="border border-slate-300 p-4 text-lg">
                              {index + 1}
                            </td>
                            <td className="border border-slate-300 p-4 text-lg">
                              {key}
                            </td>
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
                            <td className="border border-slate-300 p-4">
                              <input
                                id={key}
                                value={key}
                                type="checkbox"
                                className="w-4 h-4"
                              />
                              <label htmlFor={key} className="ml-3">
                                Verified
                              </label>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
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
