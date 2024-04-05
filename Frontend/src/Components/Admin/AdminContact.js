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
      const result = await fetch(`${host}/api/admin/adminPage`, {
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
                    <button
                      className="w-full text-black font-medium btn-txt bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg flex justify-center drop-shadow-xl"
                      onClick={() => handleAnswerButtonClick(usermsg.email)}
                    >
                      Answer
                    </button>
                  </div>
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
