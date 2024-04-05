import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "../Home/swiper.css";

const Comment = () => {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const [creditial, setCreditial] = useState({
    userComment: "",
  });

  const [comment, setComment] = useState([]);

  const [modal1Open, setModal1Open] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const openModal = (propertyFor) => {
    localStorage.setItem("propertyFor", propertyFor);
    setModal1Open(true);
  };

  const closeModal1 = () => {
    setModal1Open(false);
  };

  const getComments = async () => {
    try {
      const response = await fetch(`${host}/api/auth/showComment`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // parses JSON response into native JavaScript objects
      const json = await response.json();

      if (json.message === "Token expired") {
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
          navigate(`/login`);
        }, 2000);
      }

      var myCommentData = [];

      for (let i = 0; i < json.length; i++) {
        const result = await fetch(`${host}/api/auth/getUserDetail`, {
          method: "POST",
          body: JSON.stringify({ id: json[i].uid }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await result.json();

        if (data.message === "Token expired") {
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
            navigate(`/login`);
          }, 2000);
        } else {
          myCommentData.push([
            data?.profileImage,
            data?.firstname + " " + data?.lastname,
            json[i].comment,
            json[i].uid,
            json[i]._id,
          ]);
        }
      }
      setComment(myCommentData);
    } catch (error) {
      toast.error("Error occur to fetch comments.", {
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

  useEffect(() => {
    getComments();
    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      initialSlide: 1,
      autoplay: {
        delay: 5000, // Set the delay between slides in milliseconds
        disableOnInteraction: false, // Continue autoplay even when user interacts with slides
      },

      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    return () => {
      swiper.destroy(); // Clean up Swiper when component is unmounted
    };
  }, []);

  const clickHandler = async (e) => {
    if (creditial.userComment !== "") {
      // Api call
      const response = await fetch(`${host}/api/auth/comment`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: user?._id,
          comment: creditial.userComment,
        }), // body data type must match "Content-Type" header
      });

      // parses JSON response into native JavaScript objects
      const json = await response.json();

      if (json.message === "Token expired") {
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
          navigate(`/login`);
        }, 2000);
      } else if (json) {
        toast.success("Your Comment is added...", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          getComments();
          setModal1Open(false);
        }, 1000);
      } else {
        toast.warning("Attention! Please provide correct information...", {
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
    } else {
      toast.warning("Please fill all the field...", {
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

  const deleteComment = async (id) => {
    toast.warning("You are Deleting Comment...", {
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

    let data = await fetch(`${host}/api/auth/commentDelete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    data = await data.json();

    if (data.ok) {
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

      getComments();
    } else {
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
    }
  };

  const onChange = (e) => {
    setCreditial({ ...creditial, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <div className="container px-5 py-6 mx-auto">
        <div className="lg:w-1/2 w-full mb-6">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Review
          </h1>
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>
      <div>
        {comment ? (
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              {comment.map((commentDetails) => {
                return (
                  <div className="cardComment swiper-slide">
                    <div className="card__image">
                      <img
                        alt="testimonial"
                        src={user?.profileImage}
                        key={commentDetails[0]}
                        className=" border-4 p-3 border-orange-400"
                      />
                    </div>

                    <div className="card__content">
                      <span className="card__title text-indigo-700  font-bold">
                        {commentDetails[1]}
                      </span>
                      <p className="card__text">{commentDetails[2]}</p>
                    </div>
                    {(() => {
                      if (
                        user?._id === commentDetails[3] ||
                        user?._id === "6607c5e98d927d0ab775d102"
                      ) {
                        return (
                          <button
                            onClick={() => {
                              deleteComment(commentDetails[4]);
                            }}
                            className="text-white font-semibold px-6 py-2 rounded bg-orange-400 hover:bg-orange-500 drop-shadow-lg hover:drop-shadow-xl"
                          >
                            Delete
                          </button>
                        );
                      }
                    })()}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div> Apologize to No Comments Yet Post </div>
        )}
      </div>

      <div className="p-2 w-full">
        {user ? (
          <button
            onClick={() => {
              openModal("Sell");
            }}
            className="flex mx-auto my-8 text-white border-0 py-2 px-8 focus:outline-none text-lg rounded bg-orange-400 hover:bg-orange-500 drop-shadow-lg hover:drop-shadow-xl"
          >
            Add Comment
          </button>
        ) : (
          <div></div>
        )}
        {modal1Open && (
          <form onSubmit={handleSubmit(clickHandler)}>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg w-1/3">
                <div className="mb-4 py-2 flex bg-orange-400 rounded-t-lg">
                  <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                    Reviews :
                  </span>
                  <button
                    onClick={closeModal1}
                    className="text-white font-bold text-xl px-5"
                  >
                    ✕
                  </button>
                </div>
                <div className="justify-center px-16 py-5">
                  <div className="pb-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="userComment"
                        className="leading-7 font-medium text-md text-gray-900"
                      >
                        Comment : <span className="red">*</span>
                      </label>
                      <textarea
                        id="userComment"
                        name="userComment"
                        value={creditial.userComment}
                        {...register("userComment", {
                          required: "Please enter your comment!",
                        })}
                        onChange={onChange}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      />
                      <p className="text-sm text-red-500 absolute">
                        {errors.userComment?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pl-48 pb-8">
                  <button className="text-white font-semibold px-5 mr-6 py-2 rounded bg-orange-400 hover:bg-orange-500 drop-shadow-lg hover:drop-shadow-xl">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
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

export default Comment;
