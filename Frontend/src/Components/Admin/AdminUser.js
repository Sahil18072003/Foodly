import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AdminUser({ setModalAdminUser }) {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const [userlist, setUserlist] = useState([]);

  const [userToDelete, setUserToDelete] = useState(null);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const closeModal1 = () => {
    setModalAdminUser(false);
  };

  const openConfirmationModal = (userId) => {
    setUserToDelete(userId);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setUserToDelete(null);
  };

  const handleDeleteUser = (userId) => {
    try {
      // Code to delete user from the database
      DeleteUser(userId);
      // Close the confirmation modal
      closeConfirmationModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // for Admin User Data
  const getAllUsers = async () => {
    const result = await fetch(`${host}/api/admin/adminPage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    var data = await result.json();

    if (!data) {
      toast.error("Your Token has expired... login again", {
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
      setUserlist(data);
    }
  };

  // for Admin User Delete API
  const DeleteUser = async (uid) => {
    toast.success("Successfully deleted User's all comments...", {
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
    // 1. Delete Comments of that user
    let delcomment = await fetch(`${host}/api/admin/deleteAllComments/${uid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    delcomment = await delcomment.json();
    console.log(delcomment);

    if (delcomment) {
      // Update userlist state after successful deletion
      toast.success("Successfully deleted User's all comments...", {
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
    } else if (!delcomment) {
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
      toast.error("Sorry error occur in commets delete...", {
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

    // 2. Delete Restaurants of that user
    let delres = await fetch(`${host}/api/admin/deleteAllRestaurants/${uid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    delres = await delres.json();
    console.log(delres);

    if (delres) {
      // Update userlist state after successful deletion
      toast.success("Successfully deleted User's restaurants...", {
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
    } else if (!delres) {
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
      toast.error("Sorry error occur in restaurant delete...", {
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

    // 3. User Delete
    let deluser = await fetch(`${host}/api/admin/adminPage/${uid}`, {
      method: "DELETE", // Corrected spelling here
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    deluser = await deluser.json();
    console.log(deluser);

    if (deluser) {
      // Update userlist state after successful deletion
      toast.success("Successfully deleted User...", {
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

      getAllUsers();
    } else if (!deluser) {
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
      toast.error("Sorry error occur in user delete...", {
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
      <div className="bg-white rounded-lg lg:w-5/6 h-5/6 md:w-4/5 sm:w-3/5">
        <div className="py-3 flex bg-orange-400 rounded-t-lg">
          <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
            User Details
          </span>
          <button
            onClick={closeModal1}
            className="text-white font-bold text-xl px-6"
          >
            ✕
          </button>
        </div>
        <div className="justify-center p-10 sm:col-span-3 rounded-2xl">
          <table className="table-fixed justify-center shadow-xl overflow-y-scroll block h-full">
            <thead className="bg-orange-400 rounded-md text-white shadow-md text-md">
              <tr className="text-white">
                <th className="border border-slate-300 p-2 text-white">
                  Sr No.
                </th>
                <th className="border border-slate-300 p-2 text-white">
                  Username
                </th>
                <th className="border border-slate-300 p-2 text-white">
                  Image
                </th>
                <th className="border border-slate-300 p-2 text-white">
                  Email
                </th>
                <th className="border border-slate-300 p-2 text-white">
                  Phone
                </th>
                <th className="border border-slate-300 p-2 text-white">
                  Address
                </th>
                <th className="border border-slate-300 p-2 text-white">
                  Operation
                </th>
              </tr>
            </thead>
            <tbody className="text-center px-5 mx-10">
              {userlist?.length > 0 ? (
                userlist?.map((userdetail, index) =>
                  userdetail?._id !== "6607c5e98d927d0ab775d102" ? (
                    <tr key={index}>
                      <td className="border border-slate-300 text-lg">
                        {index}
                      </td>
                      <td className="border border-slate-300 px-5 text-lg">
                        {userdetail?.firstname
                          ? userdetail?.firstname +
                            " " +
                            (userdetail?.lastname ? userdetail?.lastname : "")
                          : ""}
                      </td>
                      <td className="border border-slate-300">
                        <img
                          src={userdetail?.profileImage}
                          onError="fallbackImage()"
                          alt=""
                          className="w-32 h-24"
                        />
                      </td>
                      <td className="border border-slate-300 px-5 text-lg">
                        {userdetail?.email}
                      </td>
                      <td className="border border-slate-300 px-5 text-lg">
                        {userdetail?.phone}
                      </td>
                      <td className="border border-slate-300 px-5 text-lg">
                        {userdetail?.address}
                      </td>
                      <td className="border border-slate-300 justify-center text-center">
                        <button
                          onClick={() => openConfirmationModal(userdetail?._id)}
                          className="text-white font-semibold mx-5 mr-6 px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl"
                        >
                          Delete
                        </button>
                        {showConfirmationModal && (
                          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg lg:w-1/4 md:w-1/2 sm:w-1/2">
                              <div className="py-3 flex bg-orange-400 rounded-t-lg">
                                <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                                  Confirmation
                                </span>
                              </div>
                              <div className="py-7 px-6">
                                <p className="text-lg font-large">
                                  Are you sure you want to delete this user?
                                </p>
                                <div className="flex justify-center mt-4">
                                  <button
                                    onClick={() =>
                                      handleDeleteUser(userToDelete)
                                    }
                                    className="text-white font-semibold mx-2 px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    onClick={closeConfirmationModal}
                                    className="bg-gray-300 text-gray-700 font-semibold mx-2 px-4 py-2 rounded hover:bg-gray-400 drop-shadow-lg hover:drop-shadow-xl"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
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
                    </tr>
                  ) : null
                )
              ) : (
                <tr>
                  <td>
                    <h1>No Users available</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default AdminUser;
