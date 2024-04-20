import React, { useState, useEffect, useContext } from "react";
// import { UserDataContext } from "../../components/user/UserDataContext";
// import OderPage from "../../components/oderPage/OderPage";
import "./Cart.css";

const Cart = () => {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const dataType = "cart";

  const [itemsState, setItemsState] = useState({});

  const [dbList, setDbList] = useState([]);

  const [productData, setProductData] = useState([]);
  console.log(productData);

  const handleAddToCartClick = async (_id) => {
    // handleAddToCart(_id);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    console.log("Cart Items:", cartItems);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    if (user) {
      fetch(
        `${host}/api/auth/get-user-data-list?uid=${user?._id}&dataType=${dataType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("dbList:", data.arrayData); // Debugging log
          setDbList(data.arrayData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dataType, user, itemsState]);

  useEffect(() => {
    const fetchDataForProductCards = async () => {
      const ProductDataPromises = dbList.map(async (item) => {
        const response = await fetch(
          `${host}/api/food/getOneFoodDetails/${item?._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ foodId: item?._id }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json(); // Destructuring the data from responseData

        return {
          ...data,
          quantity: 1,
        };
      });

      try {
        const resolvedProductData = await Promise.all(ProductDataPromises);

        console.log("updatedProductData:", resolvedProductData); // Debugging log

        setProductData(resolvedProductData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (dbList.length > 0) {
      fetchDataForProductCards();
    }
  }, [dbList]);

  //----------------------------------------------------------------------------------------qty price

  // const handleDecreaseQuantity = (index) => {
  //   const updatedProductData = [...productData];
  //   if (updatedProductData[index].quantity > 1) {
  //     updatedProductData[index].quantity -= 1;
  //     setProductData(updatedProductData);
  //   }
  // };

  // const handleIncreaseQuantity = (index) => {
  //   const updatedProductData = [...productData];
  //   updatedProductData[index].quantity += 1;
  //   setProductData(updatedProductData);
  // };

  // const totalPrice = productData.reduce((total, product) => {
  //   const itemPrice = product.data.product.price || 0; // Use 0 if price is missing or falsy
  //   const itemQuantity = product.quantity || 0; // Use 0 if quantity is missing or falsy
  //   return total + itemPrice * itemQuantity;
  // }, 0);

  //-----------------------------------------------------------------------------------------------

  const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   // Populate the cart items array when product data is available
  //   if (Array.isArray(productData) && productData.length > 0) {
  //     const updatedCartItems = productData.map((product) => {
  //       return {
  //         _id: product.data.product._id,
  //         name: product.data.product.name,
  //         price: product.data.product.price,
  //         quantity: product.quantity,
  //       };
  //     });
  //     setCartItems(updatedCartItems);
  //   }
  // }, [productData]);

  if (
    Array.isArray(productData) &&
    Array.isArray(dbList) &&
    productData.length === dbList.length
  ) {
    return (
      <>
        <section className="cart-items">
          <div className="container d_flex">
            {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

            <div className="cart-details">
              {productData.length === 0 && (
                <h1 className="no-items product">No Items are add in Cart</h1>
              )}

              {/* yasma hami le cart item lai display garaaxa */}

              {productData.map((product, index) => {
                const data = product.data.product;
                const productQty = data.price * product.quantity;

                return (
                  <div className="cart-list product d_flex" key={data._id}>
                    <div className="img">
                      <img src={data.mainImage} alt="" />
                    </div>
                    <div className="cart-details">
                      <h3>{data.name}</h3>
                      <h4>
                        ₹{data.price}.00 * {product.quantity}
                        <span>₹{productQty}.00</span>
                      </h4>
                    </div>
                    <div className="cart-items-function">
                      <div className="removeCart">
                        <button
                          className="removeCart"
                          onClick={() => {
                            handleAddToCartClick(data._id);
                          }}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>

                      <div className="cartControl d_flex">
                        <button
                          className="incCart"
                          // onClick={() => handleIncreaseQuantity(index)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                        <button
                          className="desCart"
                          // onClick={() => handleDecreaseQuantity(index)}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price"></div>
                  </div>
                );
              })}
            </div>

            <div className="cart-total product">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                {/* <h3>₹{totalPrice}.00</h3> */}
              </div>
              <button className="cart-btn" onClick={openPopup}>
                Buy Now
              </button>
              {/* {isPopupOpen && (
                // <OderPage
                //   onClose={closePopup}
                //   cartItems={cartItems}
                //   //price={totalPrice}
                // />
              )} */}
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return "Loading...";
  }
};

export default Cart;
