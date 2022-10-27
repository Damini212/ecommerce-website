import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

import "./Home.css";

export default function Home(props) {
  return (
    <div>
      <div className="page-wrapper">
        <div className="background-page"></div>
        <div className="product-home">
          {props.jewel.map((item, index) => {
            return (
              <div className="product-detail">
                <Link to={`/products/${item.id}`}>
                  <img className="product-image-home" src={item.image} />
                </Link>
                <h3>Special Collection</h3>
                <div>{item.title}</div>
                <div className="price">£{item.price}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Footer className="footer" />
      </div>
    </div>
  );
}
