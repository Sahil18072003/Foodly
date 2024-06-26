import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { faTruckMonster } from "@fortawesome/free-solid-svg-icons";

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
      toast.success("Restaurant deleted successfully...", {
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

  const [pageCreationStatus, setPageCreationStatus] = useState("");

  const [docVerificationStatus, setDocVerificationStatus] = useState("");

  const [deliveryActivationStatus, setDeliveryActivationStatus] = useState("");

  const [menuDigitisationStatus, setMenuDigitisationStatus] = useState("");

  const [bankDetailsVerificationStatus, setBankDetailsVerificationStatus] =
    useState("");

  const [partnershipStatus, setPartnershipStatus] = useState("");

  // Create Restaurant Page API
  const createResPage = async (id, isAllowed) => {
    let response = await fetch(`${host}/api/admin/createResPage/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        _id: id,
        isrespagecreated: isAllowed,
      }),
    });

    response = await response.json();

    if (response.message === "true") {
      // setPageCreationStatus(true);
      toast.success("Restaurant page creation allowed.", {
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
    } else if (response.message === "false") {
      // setPageCreationStatus(false);
      toast.warn("Restaurant page creation denied.", {
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
    } else {
      // setPageCreationStatus(null);
      toast.error("Failed to allow restaurant page creation.", {
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

  // Document Verification API
  const documentVerification = async (id, isAllowed) => {
    let response = await fetch(`${host}/api/admin/documentVerification/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        _id: id,
        isdocverified: isAllowed,
      }),
    });

    response = await response.json();

    if (response.message === "true") {
      toast.success("Documents verified successfully.", {
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
    } else if (response.message === "false") {
      // setDocVerificationStatus(false);
      toast.warn("Document verification pending", {
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
    } else {
      setDocVerificationStatus("");
      toast.error("Failed to verify documents.", {
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

  // Delivery Activation API
  const deliveryActivation = async (id, isAllowed) => {
    let response = await fetch(`${host}/api/admin/deliveryActivation/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        _id: id,
        isactivedelivery: isAllowed,
      }),
    });

    response = await response.json();

    if (response.message === "true") {
      toast.success("Delivery activated successfully.", {
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
    } else if (response.message === "false") {
      // setDeliveryActivationStatus(false);
      toast.warn("Delivery Activation Pending", {
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
    } else {
      setDeliveryActivationStatus("");
      toast.error("Failed to activate delivery.", {
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

  // Menu Digitisation API
  const menuDigitisation = async (id, isAllowed) => {
    let response = await fetch(`${host}/api/admin/menuDigitisation/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        _id: id,
        ismenudigitisation: isAllowed,
      }),
    });

    response = await response.json();

    if (response.message === "true") {
      toast.success("Menu digitization allowed.", {
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
    } else if (response.message === "false") {
      // setMenuDigitisationStatus(false);
      toast.warn("Menu digitisation pending", {
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
    } else {
      setMenuDigitisationStatus("");
      toast.error("Failed to allow menu digitization.", {
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

  // Bank Details Verification API
  const bankDetailsVerification = async (id, isAllowed) => {
    let response = await fetch(
      `${host}/api/admin/bankDetailsVerification/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          _id: id,
          isbankdetailsverified: isAllowed,
        }),
      }
    );

    response = await response.json();

    if (response.message === "true") {
      toast.success("Bank details verification completed", {
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
    } else if (response.message === "false") {
      // setBankDetailsVerificationStatus(false);
      toast.warn("Bank details verification pending", {
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
    } else {
      setBankDetailsVerificationStatus("");
      toast.error("Failed to verification of bank details.", {
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

  // Partnership Verification API
  const partnershipDone = async (id, isAllowed) => {
    let response = await fetch(`${host}/api/admin/partnershipDone/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        _id: id,
        ispartnership: isAllowed,
      }),
    });

    response = await response.json();

    if (response.message === "true") {
      toast.success("Partnership done successfully.", {
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
    } else if (response.message === "false") {
      // setPartnershipStatus(false);
      toast.warn("Document verification is pending", {
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
    } else {
      setPartnershipStatus("");
      toast.error("Failed to do partnership.", {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-200 rounded-lg h-5/6 lg:fit-content md:w-4/5 sm:w-3/5">
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
        <div className="justify-center px-10 pt-10 sm:col-span-3 bg-gray-200 overflow-y-scroll h-5/6">
          <div className="overflow-y-scroll w-full flex flex-wrap h-fit">
            {restaurant?.length > 0 ? (
              restaurant?.map((res, index) => (
                <div
                  key={res?._id}
                  className="p-2 bg-orange-100 m-2 w-full rounded-lg bg-white hover:border-orange-300 hover:shadow-xl"
                >
                  <table className="table-fixed justify-center shadow-xl overflow-y-scroll block w-fit-content h-full">
                    <tbody className="px-4 mx-10">
                      <tr>
                        <td className="border border-slate-300 text-lg p-4">
                          <div className="text-lg">
                            <strong>ResId : {res?._id}</strong>
                          </div>
                          <div className="text-lg font-semibold">
                            ResCategory : {res?.rescategory}
                          </div>
                        </td>
                        <td className="border border-slate-300 text-md p-4">
                          <button
                            onClick={() => openModal(res)}
                            className="text-white font-semibold px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 drop-shadow-lg hover:drop-shadow-xl block"
                          >
                            Start Verification
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md p-4">
                          <button
                            onClick={() => openConfirmationModal(res?._id)}
                            className="text-white font-semibold px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl block"
                          >
                            Delete Restaurant
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
                                    Are you sure you want to delete this
                                    Restaurant?
                                  </p>
                                  <div className="flex justify-center mt-8">
                                    <button
                                      onClick={() =>
                                        handleDeleteRestaurant(
                                          restaurantToDelete
                                        )
                                      }
                                      className="text-white font-semibold mx-5 mr-6 px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl block"
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
                        </td>
                        <td className="border border-slate-300 text-xl font-bold text-center">
                          Status
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 text-lg p-4">
                          <div className="text-lg">
                            Restaurant page allows to create ?
                          </div>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              createResPage(res?._id, "true");
                              setPageCreationStatus(true);
                            }}
                          >
                            Yes
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              createResPage(res?._id, "false");
                              setPageCreationStatus(false);
                            }}
                          >
                            No
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md px-4">
                          {res?.isrespagecreated === "true" ||
                          pageCreationStatus ? (
                            <div className="text-lg text-green-500">
                              Foodly page created successfully
                            </div>
                          ) : (
                            <div className="text-lg text-red-500">
                              Foodly page creation pending
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 text-lg p-4">
                          <div className="text-lg">
                            Restaurant documents and proofs verified ?
                          </div>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              documentVerification(res?._id, "true");
                              setDocVerificationStatus(true);
                            }}
                          >
                            Yes
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              documentVerification(res?._id, "false");
                              setDocVerificationStatus(false);
                            }}
                          >
                            No
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md px-4">
                          {res?.isdocverified === "true" ||
                          docVerificationStatus ? (
                            <div className="text-lg text-green-500">
                              Documents verified successfully
                            </div>
                          ) : (
                            <div className="text-lg text-red-500">
                              Documents verification pending
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 text-lg p-4">
                          <div className="text-lg">Delivery Activation ?</div>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              deliveryActivation(res?._id, "true");
                              setDeliveryActivationStatus(true);
                            }}
                          >
                            Yes
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              deliveryActivation(res?._id, "false");
                              setDeliveryActivationStatus(false);
                            }}
                          >
                            No
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md px-4">
                          {res?.isactivedelivery === "true" ||
                          deliveryActivationStatus ? (
                            <div className="text-lg text-green-500">
                              Delivery activated successfully
                            </div>
                          ) : (
                            <div className="text-lg text-red-500">
                              Delivery activation pending
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 text-lg p-4">
                          <div className="text-lg">Menu digitisation ?</div>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              menuDigitisation(res?._id, "true");
                              setMenuDigitisationStatus(true);
                            }}
                          >
                            Yes
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              menuDigitisation(res?._id, "false");
                              setMenuDigitisationStatus(false);
                            }}
                          >
                            No
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md px-4">
                          {res?.ismenudigitisation === "true" ||
                          menuDigitisationStatus ? (
                            <div className="text-lg text-green-500">
                              Menu digitisation successfully
                            </div>
                          ) : (
                            <div className="text-lg text-red-500">
                              Menu digitisation pending
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 text-lg p-4">
                          <div className="text-lg">Bank Details validate ?</div>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              bankDetailsVerification(res?._id, "true");
                              setBankDetailsVerificationStatus(true);
                            }}
                          >
                            Yes
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              bankDetailsVerification(res?._id, "false");
                              setBankDetailsVerificationStatus(false);
                            }}
                          >
                            No
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md px-4">
                          {res?.isbankdetailsverified === "true" ||
                          bankDetailsVerificationStatus ? (
                            <div className="text-lg text-green-500">
                              Bank details verified successfully
                            </div>
                          ) : (
                            <div className="text-lg text-red-500">
                              Bank details verification pending
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 text-lg p-4">
                          <div className="text-lg">Partnership done ?</div>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              partnershipDone(res?._id, "true");
                              setPartnershipStatus(true);
                            }}
                          >
                            Yes
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md">
                          <button
                            className="text-white font-semibold m-auto px-4 py-2 rounded bg-red-500 hover:bg-red-600 drop-shadow-lg hover:drop-shadow-xl block"
                            onClick={() => {
                              partnershipDone(res?._id, "false");
                              setPartnershipStatus(false);
                            }}
                          >
                            No
                          </button>
                        </td>
                        <td className="border border-slate-300 text-md px-4">
                          {res?.ispartnership === "true" ||
                          partnershipStatus ? (
                            <div className="text-lg text-green-500">
                              Partnership done successfully
                            </div>
                          ) : (
                            <div className="text-lg text-red-500">
                              Partnership pending
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <div>
                <h1>No Restaurants available</h1>
              </div>
            )}
          </div>
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
    </div>
  );
}

export default AdminRestaurant;
