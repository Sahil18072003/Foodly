import React, { useState, useEffect, useContext } from "react";
import "./OderPage.css";
import AddresValues from "./AddresValues";

export default function OderPage({ onClose, cartItems }) {
  const host = "http://localhost:5000";

  const user = JSON.parse(localStorage.getItem("user"));

  const [errorMessage, setErrorMessage] = useState(null);

  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const initialQuantities = cartItems.map((item) => item.quantity || 1);
      setQuantities(initialQuantities);
    }
  }, [cartItems]);

  const [address, setAddress] = useState({});

  useEffect(() => {
    if (user) {
      fetch(
        `${host}/Firebaseuser/get-user-data-list?uid=${user?._id}&dataType=address`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
          setAddress(data.arrayData[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  let products = cartItems.map((item) => ({
    _id: item._id,
    name: item.name,
    quantity: quantities[cartItems.indexOf(item)],
    price: item.price
  }));

  console.log(products);

  const handleDecreaseQuantity = (index) => {
    if (quantities[index] > 1) {
      const newQuantities = [...quantities];
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  const handleIncreaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item, index) => {
      totalPrice += item.price * quantities[index];
    });
    return totalPrice.toFixed(2);
  };

  const amount = 100000;
  console.log(amount);
  const currency = "INR";
  const receiptId = "23456TY";

  const paymentHandler = async (e) => {
    const response = await fetch(`${host}/razorpay`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Foodly", //your business name
      description: "Test Transaction",
      image: "../assets/images/logo.jpeg",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(`${host}/razorpay/validate`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonRes = await validateRes.json();

        const orderData = {
          uid: user?._id,
          name: user?.firstname + user?.lastname,
          email: user?.email,
          phone: user?.phone,
          address: user?.address,

          date: new Date().toLocaleString(),
          orderStatus: "created",
          orderId: jsonRes.orderId,
          paymentId: jsonRes.paymentId,
          paymentStatus: jsonRes.msg,
          totalPrice: calculateTotalPrice(),
          products: products,
        };

        const orderResponse = await fetch(`${host}/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const data = await orderResponse.json();
        console.log("orderCreated", data);

        console.log("orderData", orderData);
      },

      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: user?.firstname + user?.lastname, //your customer's name
        email: user?.email, //your customer's email
        contact: user?.phone, //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#ffa500",
      },
    };
    var rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      setErrorMessage(
        response.error.code,
        response.error.description,
        response.error.source,
        response.error.step,
        response.error.reason,
        response.error.metadata.order_id,
        response.error.metadata.payment_id
      );
    });
    rzp1.open();
    if (e) {
      e.preventDefault(); // Check if e is defined before using it
    }
  };
  const handleCheckout = () => {
    if (!address || Object.keys(address).length === 0) {
    //   setErrorMessage("Please add an address before checking out.");
	paymentHandler();
    } else {
      paymentHandler();
    }
  };
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          x
        </button>
        {errorMessage && (
          <div className="error-popup">
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage(null)}>Ok</button>
          </div>
        )}

        <AddresValues />
        <div className=" address">
          <div className="container ">
            <h1>Invoice</h1>
            <div>
              <div className="invoiceDiv">
                <strong>Invoice Date:</strong> {new Date().toLocaleDateString()}
              </div>
              <hr />
              <div className="invoiceDiv">
                <div className="invoiceDiv2">
                  <strong>Products:</strong>
                  <div>
                    {Array.isArray(cartItems) &&
                      cartItems.map((item, index) => (
                        <div key={index} style={{ margin: "5px 0" }}>
                          {item.name}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="invoiceDiv2">
                  <strong>Quantity:</strong>

                  <div>
                    {Array.isArray(cartItems) &&
                      cartItems.map((item, index) => (
                        <div key={index} style={{ margin: "5px 0" }}>
                          <button onClick={() => handleDecreaseQuantity(index)}>
                            -
                          </button>
                          {quantities[index]}
                          <button onClick={() => handleIncreaseQuantity(index)}>
                            +
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="invoiceDiv2">
                  <strong>Price:</strong>
                  {Array.isArray(cartItems) &&
                    cartItems.map((item, index) => (
                      <div key={index} style={{ margin: "5px 0" }}>
                        ₹{item.price}
                      </div>
                    ))}
                </div>
              </div>

              <hr />
              <div className="invoiceDiv">
                <strong>Total Price:</strong> ₹{calculateTotalPrice()}
              </div>
            </div>
            <hr />
            <button className="button chackOut" onClick={handleCheckout}>
              Chack Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
