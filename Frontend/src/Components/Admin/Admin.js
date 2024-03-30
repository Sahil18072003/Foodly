import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const Admin = () => {
  const host = "http://localhost:5000";

  const [modalAdminUser, setModalAdminUser] = useState(false);

  const [userMessage, setUserMessage] = useState([]);

  // const [modalAdminProperty, setModalAdminProperty] = useState(false);

  const [modalAdminContactUs, setModalAdminContactUs] = useState(false);

  const [userlist, setUserlist] = useState([]);

  console.log(userlist);

  // const [database, setdatabase] = useState([]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate();

  const openModal = () => {
    setModalAdminUser(true);
  };

  const closeModal1 = () => {
    setModalAdminUser(false);
  };

  // const openModal2 = () => {
  //   setModalAdminProperty(true);
  // };

  // const closeModal2 = () => {
  //   setModalAdminProperty(false);
  // };

  const openModal3 = () => {
    setModalAdminContactUs(true);
  };

  const closeModal3 = () => {
    setModalAdminContactUs(false);
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

  const handleAnswerButtonClick = (userEmail) => {
    const mailtoLink = `mailto:${userEmail}`;
    const mailLinkElement = document.createElement("a");
    mailLinkElement.href = mailtoLink;
    mailLinkElement.target = "_blank";
    mailLinkElement.click();
  };

  useEffect(() => {
    getAllUsers();
    // getData();
    getMessages();
  }, []);

  // for Admin Conatct Data
  const getMessages = async () => {
    const result = await fetch(`${host}/api/auth/adminPage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await result.json();
    setUserMessage(data);
  };

  // for Admin User Data
  const getAllUsers = async () => {
    const result = await fetch(`${host}/api/auth/adminPage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
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
      }, 5000);
    } else {
      setUserlist(data);
    }
  };

  const DeleteUser = async (id) => {
    let deluser = await fetch(`${host}/api/auth/adminPage/${id}`, {
      method: "DELETE", // Corrected spelling here
      headers: {
        // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    deluser = await deluser.json();

    if (deluser.ok) {
      // Update userlist state after successful deletion
      setUserlist(userlist.filter((user) => user._id !== id));

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
      }, 4000);
    } else {
      getAllUsers();
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          <div className="p-4 md:w-1/3">
            <button
              onClick={() => {
                openModal();
              }}
            >
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:border-indigo-300 hover:shadow-xl hover:scale-105">
                <img
                  className="p-4 w-full object-cover object-center"
                  src={require(`../../assets/Admin/AdminUser_2.jpg`)}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-center text-lg title-font font-medium text-gray-400 mb-1">
                    {userlist?.length}
                  </h2>
                  <h1 className="title-font text-lg text-center font-semibold text-gray-900 mb-3 hover:text-indigo-500 hover:text-xl">
                    The Catalyzer
                  </h1>
                </div>
              </div>
            </button>
            {modalAdminUser && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg lg:w-4/5 md:w-3/5 sm:w-3/5">
                  <div className="py-3 flex bg-orange-400 rounded-t-lg">
                    <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                      User Details{modalAdminUser}
                    </span>
                    <button
                      onClick={closeModal1}
                      className="text-white font-bold text-xl px-6"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="justify-center px-20 py-6 mb-4 sm:col-span-3 rounded-2xl">
                    <table className="table-fixed justify-center shadow-xl overflow-y-scroll block h-[400px]">
                      <thead className=" bg-indigo-400 rounded text-white shadow-md">
                        <tr>
                          <th className="border border-slate-300 p-2">
                            Sr No.
                          </th>
                          <th className="border border-slate-300 p-2">
                            Username
                          </th>
                          <th className="border border-slate-300 p-2">Image</th>
                          <th className="border border-slate-300 p-2">Email</th>
                          <th className="border border-slate-300 p-2">Phone</th>
                          <th className="border border-slate-300 p-2">
                            Address
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center px-5 mx-10">
                        {userlist?.length > 0 ? (
                          userlist?.map((userdetail, index) =>
                            userdetail?._id !== "65dacb990022155a26808a13" ? (
                              <tr key={index}>
                                <td className="border border-slate-300">
                                  {index}
                                </td>
                                <td className="border border-slate-300 px-5">
                                  {userdetail.firstname +
                                    " " +
                                    userdetail.lastname}
                                </td>
                                <td className="border border-slate-300 ">
                                  <img
                                    src={userdetail.profileImage}
                                    onerror="fallbackImage()"
                                    alt=""
                                    className="w-32 h-24"
                                  />
                                </td>
                                <td className="border border-slate-300 px-5">
                                  {userdetail?.email}
                                </td>
                                <td className="border border-slate-300 px-5">
                                  {userdetail?.phone}
                                </td>
                                <td className="border border-slate-300 px-5">
                                  {userdetail?.address}
                                </td>
                                <td className="border border-slate-300 justify-center text-center">
                                  <button
                                    onClick={() =>
                                      openConfirmationModal(userdetail._id)
                                    }
                                    className="bg-red-500 text-white font-semibold mx-5 mr-6 px-3 py-1 rounded hover:bg-indigo-700 "
                                  >
                                    Delete
                                  </button>
                                  {showConfirmationModal && (
                                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                      <div className="bg-white rounded-lg lg:w-1/4 md:w-1/2 sm:w-1/2">
                                        <div className="py-7 px-6">
                                          <p>
                                            Are you sure you want to delete this
                                            user?
                                          </p>
                                          <div className="flex justify-end mt-4">
                                            <button
                                              onClick={() =>
                                                handleDeleteUser(userToDelete)
                                              }
                                              className="bg-red-500 text-white font-semibold mx-2 px-4 py-2 rounded hover:bg-red-700"
                                            >
                                              Delete
                                            </button>
                                            <button
                                              onClick={closeConfirmationModal}
                                              className="bg-gray-300 text-gray-700 font-semibold mx-2 px-4 py-2 rounded hover:bg-gray-400"
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
              </div>
            )}
          </div>

          <div className="p-4 md:w-1/3">
            <button
              onClick={() => {
                openModal3();
              }}
            >
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:border-indigo-300 hover:shadow-xl hover:scale-105">
                <img
                  className=" w-full object-cover object-center"
                  src={require(`../../assets/Admin/AdminContactUs2.jpg`)}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-center text-lg title-font font-medium text-gray-400 mb-1">
                    {userMessage.length}
                  </h2>
                  <h1 className="title-font text-lg text-center font-semibold text-gray-900 mb-3 hover:text-indigo-500 hover:text-xl">
                    Contact Us Queries
                  </h1>
                </div>
              </div>
            </button>
            {modalAdminContactUs && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg lg:w-3/5 md:w-3/5 sm:w-3/5">
                  <div className="py-3 flex bg-orange-400 rounded-t-lg">
                    <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                      User Messages{modalAdminContactUs}
                    </span>
                    <button
                      onClick={closeModal3}
                      className="text-white font-bold text-xl px-6"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="sm:col-span-3 rounded-lg justify-center p-6">
                    <section className="text-gray-600 body-font overflow-y-scroll block max-h-[400px]">
                      <div className="flex flex-wrap container">
                        {userMessage &&
                          userMessage.map((usermsg, index) => (
                            <div
                              key={index}
                              className="p-4 w-full md:w-1/2 lg:w-1/2"
                            >
                              <div className="bg-gray-100 hover:border-orange-400 hover:scale-105 border shadow-xl bg-opacity-75 px-5 pt-8 pb-6 rounded-lg overflow-hidden text-center relative">
                                <h1 className="text-2xl font-medium text-gray-900 mb-2">
                                  {usermsg.username}
                                </h1>
                                <h2 className="text-sm font-medium text-orange-400">
                                  {usermsg.email}
                                </h2>
                                <h2 className="text-sm font-medium text-gray-400 mb-2">
                                  {usermsg.phone}
                                </h2>
                                <p className="text-base leading-2 mb-4">
                                  {usermsg.message}
                                </p>
                                <button
                                  className="w-full text-black font-medium btn-txt bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg flex justify-center drop-shadow-xl"
                                  onClick={() =>
                                    handleAnswerButtonClick(usermsg.email)
                                  }
                                >
                                  Answer
                                </button>
                              </div>
                            </div>
                          ))}
                        {!userMessage && (
                          <p className="text-gray-500 text-center w-full mt-6">
                            No messages available
                          </p>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </div>
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
    </section>
  );
};

export default Admin;
