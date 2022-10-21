import React from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [dropDown, setDropDown] = React.useState(false);

  function toggle() {
    setDropDown(!dropDown);
  }

  function payment() {
    alert("Payment has been accepted");
  }

  function delivery() {
    alert("Free UK delivery when you spend £50 or above");
  }

  return (
    <div className="heading">
      <h1>Welcome to the designer jewelery collection</h1>
      <ul className="list-items">
        <li className="nav-link">
          <Link to="/"> Home </Link>
        </li>
        <li className="nav-link">
          <Link to="/"> Contact Us </Link>
        </li>
        <li onClick={delivery} className="nav-link">
          Delivery
        </li>
        <li className="nav-link">
          <Link to="/">Careers</Link>
        </li>
        <li className="nav-link">
          <Link to="/">Sale</Link>
        </li>
        <div className="cart-number">
          <img src="/cart.png" className="cart-img" onClick={toggle} />

          <div className="item-count">
            {Object.values(props.cart).reduce(
              (total, value) => total + value,
              0
            )}
          </div>
        </div>
      </ul>
      {dropDown && (
        <div className="drop-down">
          {Object.keys(props.cart).map((key) => {
            const jewel = props.jewel.find(
              (jewel) => jewel.id === parseInt(key)
            );

            const quantity = props.cart[key];
            return (
              <div key={jewel.id} className="cart-product-wrapper">
                <div>{jewel.title}</div>
                <div className="cart-product">
                  <img className="product-image-nav" src={jewel.image} />
                  <div>
                    Quantity:
                    <br></br>
                    <button
                      className="add-btn"
                      onClick={() => props.incInCart(jewel.id)}
                    >
                      +
                    </button>
                    {quantity}
                    <button
                      className="subtract-btn"
                      onClick={() => props.decInCart(jewel.id)}
                    >
                      -
                    </button>
                  </div>
                  <div className="quantity-count"></div>
                  <div>
                    Price: <br></br> £{quantity * jewel.price}
                  </div>
                  <img
                    src="/trash-can.svg"
                    onClick={() => props.removeItem(jewel.id)}
                    className="remove-btn"
                  />
                </div>
              </div>
            );
          })}

          <div>
            Total: £
            {Object.keys(props.cart).reduce((total, key) => {
              const jewel = props.jewel.find(
                (jewel) => jewel.id === parseInt(key)
              );
              if (!jewel) {
                return total;
              }
              const quantity = props.cart[key];
              return total + quantity * jewel.price;
            }, 0)}
          </div>
          <button onClick={payment} className="pay-btn">
            Pay
          </button>
        </div>
      )}
    </div>
  );
}
