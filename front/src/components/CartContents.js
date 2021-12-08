/* 

PAGE BUILT BY: JENNIFER

*/

import React, { useEffect, useState } from "react";

export default function CartContents({ carts, setCarts }) {
  const [sum, setSum] = useState({ subtotal: 0, tax: 0, total: 0 });

  useEffect(() => {
    const calculatePrice = () => {
      let subtotal = 0;
      carts.map((item) => (subtotal += item.number * item.price));
      const tax = parseFloat((subtotal * 0.09).toFixed(2));
      const total = tax + subtotal;
      setSum({
        ...sum,
        subtotal: subtotal.toFixed(2),
        tax: tax,
        total: total.toFixed(2),
      });
    };
    calculatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts]);

  async function deleteProduct({ item }) {
    const rawData = await (
      await fetch(`/api/user/cart/deleteProduct/${item._id}`)
    ).json();
    if (rawData.delete === "success") {
      const fetchUserData = await fetch("/api/user/cart");
      const userData = await fetchUserData.json();
      setCarts(userData.userCart);
    } else {
      alert("Something's wrong, please try again!");
    }
  }

  async function changeAmount({item}, val) {
    console.log("start val:", val);
    const rawData = await fetch(`/api/user/cart/${item._id}/${val}`);
    const res = await rawData.json();
    if (res.change === "success") {
      const fetchUserData = await fetch("/api/user/cart");
      const userData = await fetchUserData.json();
      setCarts(userData.userCart);
      console.log("end");
    } else {
      alert("Something's wrong, please try again!");
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto text-center carts">
            <h1>Your Cart</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid carts-bottom">
        <div className="text-center d-none d-lg-block carts">
          <div className="row">
            <div className="col-10 mx-auto col-lg-2">
              <p>Product</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
              <p>Product Name</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
              <p>Price</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
              <p>Quantity</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
              <p>Remove</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
              <p>Total</p>
            </div>
          </div>
        </div> 
        {carts.map(function (item) {
          return (
            <div key={item._id} className="row text-center cart-item">
              <div className="col-10 mx-auto col-lg-2 cart-item">
                <img src={item.image} style={{width:"5rem", height:"5rem"}} className="img-fluid" alt={item.name} />
              </div>
              <div className="col-10 mx-auto col-lg-2 cart-item">
                {item.name}
              </div>
              <div className="col-10 mx-auto col-lg-2 cart-item">
                {item.price}
              </div>
              <div className="col-10 mx-auto col-lg-2 cart-item">
                <span className="btn"><i className="fas fa-minus" onClick={() => changeAmount({ item, }, -1)}></i></span>
                {item.number}
                <span className="btn"><i className="fas fa-plus" onClick={() => changeAmount({ item }, 1)}></i></span>
              </div>
              <div className="col-10 mx-auto col-lg-2 cart-item">
                <i
                  className="fas fa-trash remove"
                  onClick={() => deleteProduct({ item })}
                ></i>
              </div>
              <div className="col-10 mx-auto col-lg-2 cart-item">
                {(item.price * item.number).toFixed(2)}
              </div>
            </div>
          );
        })}
        <div className="col-10 mt-2 ml-sm-5 ml-sm-5 ml-md-auto total">
          <strong>Subtotal: ${sum.subtotal}</strong>
        </div>
        <div className="col-10 mt-2 ml-sm-5 ml-sm-5 ml-md-auto total">
          <strong>Tax: ${sum.tax}</strong>
        </div>
        <div className="col-10 mt-2 ml-sm-5 ml-sm-5 ml-md-auto total">
          <strong>Total: ${sum.total}</strong>
        </div>
      </div>
    </>
  );
}