import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import AdminUser from "./AdminUser";
import AdminContact from "./AdminContact";
import AdminRestaurant from "./AdminRestaurant";

const Admin = () => {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const [modalAdminUser, setModalAdminUser] = useState(false);

  const [userlist, setUserlist] = useState([]);

  const [modalAdminRestaurant, setModalAdminRestaurant] = useState(false);

  const [restaurant, setRestaurant] = useState([]);

  const [modalAdminContactUs, setModalAdminContactUs] = useState(false);

  const [userMessage, setUserMessage] = useState([]);

  const navigate = useNavigate();

  const openModal = () => {
    setModalAdminUser(true);
  };

  const openModal2 = () => {
    setModalAdminRestaurant(true);
  };

  const openModal3 = () => {
    setModalAdminContactUs(true);
  };

  useEffect(() => {
    getAllUsers();
    getRestaurantData();
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
      setUserlist(data);
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
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:border-orange-400 hover:bg-orange-100 hover:shadow-xl hover:scale-105">
                <img
                  className="p-4 w-full object-cover object-center"
                  src={require(`../../assets/Admin/AdminUser_2.jpg`)}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-center text-lg title-font font-medium text-gray-400 mb-1">
                    {userlist?.length}
                  </h2>
                  <h1 className="title-font text-lg text-center font-semibold text-gray-900 mb-3 hover:text-orange-500 hover:text-xl">
                    The Catalyzer
                  </h1>
                </div>
              </div>
            </button>
            {modalAdminUser && (
              <AdminUser setModalAdminUser={setModalAdminUser} />
            )}
          </div>

          <div className="p-4 md:w-1/3">
            <button
              onClick={() => {
                openModal2();
              }}
            >
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:border-orange-400 hover:bg-orange-100 hover:shadow-xl hover:scale-105">
                <img
                  className="p-4 w-full object-cover object-center"
                  src={require(`../../assets/Admin/Admin-4.jpg`)}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-center text-lg title-font font-medium text-gray-400 mb-1">
                    {restaurant?.length}
                  </h2>
                  <h1 className="title-font text-lg text-center font-semibold text-gray-900 mb-3 hover:text-orange-500 hover:text-xl">
                    Restaurants
                  </h1>
                </div>
              </div>
            </button>
            {modalAdminRestaurant && (
              <AdminRestaurant
                setModalAdminRestaurant={setModalAdminRestaurant}
              />
            )}
          </div>

          <div className="p-4 md:w-1/3">
            <button
              onClick={() => {
                openModal3();
              }}
            >
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:border-orange-400 hover:bg-orange-100 hover:shadow-xl hover:scale-105">
                <img
                  className="p-4 w-full object-cover object-center"
                  src={require(`../../assets/Admin/AdminContactUs2.jpg`)}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-center text-lg title-font font-medium text-gray-400 mb-1">
                    {userMessage.length}
                  </h2>
                  <h1 className="title-font text-lg text-center font-semibold text-gray-900 mb-3 hover:text-orange-500 hover:text-xl">
                    Contact Us Queries
                  </h1>
                </div>
              </div>
            </button>
            {modalAdminContactUs && (
              <AdminContact setModalAdminContactUs={setModalAdminContactUs} />
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
