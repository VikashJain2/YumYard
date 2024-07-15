import React, { useContext, useState ,useEffect} from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import {useNavigate} from 'react-router-dom'
const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url,loadCartData,login } =
    useContext(StoreContext);
  const navigate = useNavigate();
  // useEffect(()=>{
  //   async function cartData(){
  //     if(localStorage.getItem("token")){
  //       await loadCartData(localStorage.getItem("token"))
  //     }
  //   }
  //   cartData()
  // },[login])
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          // console.log(item._id);
          if (cartItems[item._id] > 0) {
            // console.log(cartItems);
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>&#x20B9;{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>&#x20B9;{item.price * cartItems[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>

                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#x20B9;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#x20B9;{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
              &#x20B9;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promo-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
