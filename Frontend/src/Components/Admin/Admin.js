import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const Admin = () => {
  const host = "http://localhost:5000";

  const [modalAdminUser, setModalAdminUser] = useState(false);
  const [modalAdminProperty, setModalAdminProperty] = useState(false);
  const [modalAdminContactUs, setModalAdminContactUs] = useState(false);
  const [userlist, setUserlist] = useState([]);
  const [database, setdatabase] = useState([]);
  const navigate = useNavigate();
  const openModal = () => {
    setModalAdminUser(true);
  };

  const closeModal1 = () => {
    setModalAdminUser(false);
  };

  const openModal2 = () => {
    setModalAdminProperty(true);
  };

  const closeModal2 = () => {
    setModalAdminProperty(false);
  };

  const openModal3 = () => {
    setModalAdminContactUs(true);
  };

  const closeModal3 = () => {
    setModalAdminContactUs(false);
  };

  useEffect(() => {
    getAllUsers();
    // getData();
    getMessages();
  }, []);

  const [userMessage, setUserMessage] = useState([]);

  const getMessages = async () => {
    const result = await fetch("http://localhost:5000/user-message", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await result.json();
    setUserMessage(data);
  };

  // Admin User Data
  const getAllUsers = async () => {
    const result = await fetch(`${host}/api/auth/login`, {
      method: "get",
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
      }, 7000);
    } else {
      setUserlist(data);
      console.log("myuserdata", data);
    }
  };

  const DeleteUser = async (id) => {
    // Delete Conversations
    const res = await fetch(`http://localhost:5000/conversations/${id}`, {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    console.log(resData);
    resData.map(async (conversationId) => {
      console.log("conId", conversationId?.conversationId);
      let data = await fetch(
        `http://localhost:5000/conversations/${conversationId?.conversationId}`,
        {
          method: "delete",
          headers: {
            // authorization: `bearer ${JSON.parse(
            //   localStorage.getItem("token")
            // )}`,
          },
        }
      );
      if (!data) {
        toast.error("Your Token has expired... Login again.", {
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
        }, 7000);
      }
    });

    toast.success(
      "Successfully deleted User, his Conversations, Comments and all its property...",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    // delete Property
    console.log(id);
    let data = await fetch(`http://localhost:5000/user-property-delete/${id}`, {
      method: "delete",
      headers: {
        // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    data = await data.json();
    if (!data) {
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
      }, 7000);
    } else {
      console.log(data);
    }

    // deleting user
    let deluser = await fetch(`http://localhost:5000/delete-user/${id}`, {
      method: "delete",
      headers: {
        // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    deluser = await deluser.json();
    if (!data) {
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
      }, 7000);
    } else {
      console.log(deluser);
      getAllUsers();
    }
  };

  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4 justify-center">
          <div class="p-4 md:w-1/3">
            <button
              onClick={() => {
                openModal();
              }}
            >
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:border-indigo-300 hover:shadow-xl hover:scale-105">
                <img
                  class="p-4 w-full object-cover object-center"
                  src="../../assets/Admin/AdminUser-2.jpg"
                  alt="blog"
                />
                <div class="p-6">
                  <h2 class="tracking-widest text-center text-lg title-font font-medium text-gray-400 mb-1">
                    {userlist?.length}
                  </h2>
                  <h1 class="title-font text-lg text-center font-semibold text-gray-900 mb-3 hover:text-indigo-500 hover:text-xl">
                    The Catalyzer
                  </h1>
                </div>
              </div>
            </button>
            {modalAdminUser && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white  rounded-lg w-auto">
                  <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                    <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                      User Details{modalAdminUser}
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
                      <div className="sm:col-span-3 rounded-2xl ">
                        <table className="table-fixed justify-center shadow-xl overflow-y-scroll  block h-[400px]">
                          <thead className=" bg-indigo-400 rounded text-white shadow-md">
                            <tr>
                              <th className="border border-slate-300 p-2">
                                Sr No.
                              </th>
                              <th className="border border-slate-300 p-2">
                                Username
                              </th>
                              <th className="border border-slate-300 p-2">
                                Image
                              </th>
                              <th className="border border-slate-300 p-2">
                                Email
                              </th>
                              <th className="border border-slate-300 p-2">
                                Phone
                              </th>
                              <th className="border border-slate-300 p-2">
                                Address
                              </th>
                            </tr>
                          </thead>
                          <tbody className=" text-center px-5 mx-10">
                            {userlist?.length > 0 ? (
                              userlist?.map((userdetail, index) =>
                                userdetail?._id !==
                                "65d326b322e19d815a45ac3d" ? (
                                  <tr key={index}>
                                    <td className="border border-slate-300">
                                      {index}
                                    </td>
                                    <td className="border border-slate-300 px-5">
                                      {userdetail?.username}
                                    </td>
                                    <td className="border border-slate-300 ">
                                      <img
                                        // src={require(`../Images/${userdetail?.image}`)}
                                        //   onerror="fallbackImage()"
                                        alt=""
                                        className="w-20 h-20"
                                      />
                                    </td>
                                    <td className="border border-slate-300 px-5">
                                      {userdetail?.email}
                                    </td>
                                    <td className="border border-slate-300 px-5">
                                      {userdetail?.phone}
                                    </td>
                                    <td className="border border-slate-300 justify-center text-center">
                                      <button
                                        onClick={() =>
                                          DeleteUser(userdetail._id)
                                        }
                                        className="bg-red-500 text-white font-semibold mx-5 mr-6 px-5 py-2 rounded hover:bg-indigo-700 "
                                      >
                                        Delete
                                      </button>{" "}
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
                                  <h1>No Users</h1>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div class="p-4 md:w-1/3">
            <button
              onClick={() => {
                openModal3();
              }}
            >
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:border-indigo-300 hover:shadow-xl hover:scale-105">
                <img
                  class=" w-full object-cover object-center"
                  src="../Admin/AdminContactUs2.jpg"
                  alt="blog"
                />
                <div class="p-6">
                  <h2 class="tracking-widest text-center text-lg title-font font-medium text-gray-400 mb-1">
                    {userMessage.length}
                  </h2>
                  <h1 class="title-font text-lg text-center font-semibold text-gray-900 mb-3 hover:text-indigo-500 hover:text-xl">
                    Contact Us Messages
                  </h1>
                </div>
              </div>
            </button>
            {modalAdminContactUs && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white  rounded-lg w-auto">
                  <div className="mb-4 py-3  flex bg-indigo-400 rounded">
                    <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                      User Messages{modalAdminContactUs}
                    </span>
                    <button
                      onClick={closeModal3}
                      className="text-white font-bold text-xl px-3"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="justify-center px-20 py-6">
                    <div className="mb-4">
                      <div className="sm:col-span-3 rounded-2xl ">
                        <section class="text-gray-600 body-font  overflow-y-scroll  block h-[400px]">
                          <div class="container px-5 py-10 mx-auto">
                            <div class="flex flex-wrap -m-4">
                              {userMessage
                                ? userMessage?.map((usermsg, index) => {
                                    return (
                                      <div key={index} class="p-4 lg:w-1/3">
                                        <div class=" bg-gray-100 hover:border-indigo-400 hover:scale-105 border shadow-xl bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center h-auto relative">
                                          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-1">
                                            {usermsg?.username}
                                          </h1>
                                          <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-8">
                                            {usermsg?.email}
                                          </h2>
                                          <p class="leading-relaxed mb-3">
                                            {usermsg?.message}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })
                                : ""}
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
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
