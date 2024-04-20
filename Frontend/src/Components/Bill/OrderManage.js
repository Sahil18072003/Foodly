/** @format */

import React, { useState, useEffect } from "react";
import "./orderManage.css";
import OrderCard from "./OrderCard";
// const API_URL = process.env.REACT_APP_API_URL;
// import { useAuth } from "../../user/AuthContext";

export default function OrderManage() {
  // Renamed from orderManage to OrderManage
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProducts();
  }, []);

  const [orders, setOrders] = useState([]);

  const fetchProducts = async () => {
    try {
      let response;

      response = await fetch(`${host}/order`);

      const data = await response.json();
      console.log(data);
      setOrders(data.data.orders);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <div className="orderManage">
        <div className="ordersList">
          {orders ? (
            orders.map((order) => <OrderCard key={order._id} order={order} />)
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </div>
    </>
  );
}
