import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate()
  const fetchOrders = async () => {
    const response = await axios.post(
      url+"/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    // console.log(response.data.data);
  };

  const cancelOrder = async(orderId)=>{
    const response = await axios.post(url+"/api/order/cancel",{orderId})

    if(response.data.success){
      toast.success("Order Cancelled")
      await fetchOrders();
     
    }
    else{
      toast.error("Something went wrong")
    }
  }
  
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {
        data.length>0?
      
      <div className="container">
        {data.map((order, index) => {
          return (
            <div className="my-orders-order" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>

              <p>&#x20B9;{order.amount}.00</p>

              <p>Items: {order.items.length}</p>

              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>

              <button onClick={fetchOrders}>Track Order</button>
              <button onClick={()=>cancelOrder(order._id)}>Cancel Order</button>
            </div>
          );
        })}
      </div>: <div className="Error-msg">
        <h1>Oops, You don't have any orders</h1>
          </div>
}
    </div>
  );
};

export default MyOrders;
