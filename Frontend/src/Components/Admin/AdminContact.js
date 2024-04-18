import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AdminContact({ setModalAdminContactUs }) {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const [userMessage, setUserMessage] = useState([]);

  const navigate = useNavigate();

  const closeModal3 = () => {
    setModalAdminContactUs(false);
  };

  const handleAnswerButtonClick = (userEmail) => {
    const mailtoLink = `mailto:${userEmail}`;
    const mailLinkElement = document.createElement("a");
    mailLinkElement.href = mailtoLink;
    mailLinkElement.target = "_blank";
    mailLinkElement.click();
  };

  useEffect(() => {
    getMessages();
  }, []);

  // for Admin Contact Data
  const getMessages = async () => {
    try {
      const result = await fetch(`${host}/api/admin/getUserContact`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!result.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await result.json();
      setUserMessage(data);
    } catch (error) {
      toast.error("Failed to fetch messages", {
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
    }
  };

  const [msgToDelete, setMsgToDelete] = useState(null);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const openConfirmationModal = (userId) => {
    setMsgToDelete(userId);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setMsgToDelete(null);
  };

  const handleDeleteMassage = (mId) => {
    try {
      // Code to delete user from the database
      DeleteMassage(mId);
      // Close the confirmation modal
      closeConfirmationModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // for Admin Massage Delete Api
  const DeleteMassage = async (id) => {
    let delmsg = await fetch(`${host}/api/admin/deleteMassage/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    delmsg = await delmsg.json();

    if (delmsg) {
      // Update userlist state after successful deletion
      toast.success("Massage deleted successfully...", {
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

      getMessages();
    } else if (!delmsg) {
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
      toast.error("Sorry error occur in Restaurant delete...", {
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
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg lg:w-3/5 md:w-3/5 sm:w-3/5">
        <div className="py-3 flex bg-orange-400 rounded-t-lg">
          <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
            User Messages
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
              {userMessage.map((usermsg, index) => (
                <div key={index} className="p-4 w-full md:w-1/2 lg:w-1/2">
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
                    <div className="w-full flex flex-column">
                      <button
                        className="flex w-1/2 text-black font-medium btn-txt bg-orange-400 border-0 m-2 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg flex justify-center drop-shadow-xl"
                        onClick={() => handleAnswerButtonClick(usermsg.email)}
                      >
                        Answer
                      </button>
                      <button
                        className="flex w-1/2 text-black font-medium btn-txt bg-orange-400 border-0 m-2 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg flex justify-center drop-shadow-xl"
                        onClick={() => openConfirmationModal(usermsg?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {showConfirmationModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                      <div className="bg-white rounded-lg lg:w-2/5 md:w-2/3 sm:w-2/3">
                        <div className="py-3 flex bg-orange-400 rounded-t-lg">
                          <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                            Confirmation
                          </span>
                        </div>
                        <div className="py-7 px-6">
                          <p className="text-lg font-large">
                            Are you sure you want to delete this Massage?
                          </p>
                          <div className="flex justify-center mt-4">
                            <button
                              onClick={() => handleDeleteMassage(msgToDelete)}
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
                </div>
              ))}

              {userMessage.length === 0 && (
                <p className="text-gray-500 text-center w-full mt-6">
                  No messages available
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AdminContact;
