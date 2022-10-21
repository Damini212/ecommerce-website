import React from "react";
import { useParams } from "react-router-dom";
import "./ProductItem.css";

export default function ProductItem(props) {
  function giftwrap() {
    alert("Gift wrap has been added to the gift");
  }

  const param = useParams();
  const jewel = props.jewel.find((item) => item.id === parseInt(param.id));
  if (!jewel) {
    return <div>Not found</div>;
  }
  return (
    <div>
      <div key={jewel.id} className="product-wrapper">
        <div className="product-items">
          <div>{jewel.title}</div>
          <img className="product-image-item" src={jewel.image} />
        </div>

        <div className="title">
          <h2>Description and Details</h2>
          {jewel.description}
          <div className="price">Price: £{jewel.price}</div>
          <div className="rating">rating - {jewel.rating.rate}</div>
          <div className="review">
            Reviewed by {jewel.rating.count} customers
          </div>
          <div>
            <div className="quantity">Quantity</div>
            <div className="quantity-count">
              <button className="add" onClick={() => props.add(jewel.id)}>
                +
              </button>
              <div>{props.count[jewel.id] || 0}</div>
              <button
                className="subtract"
                onClick={() => props.subtract(jewel.id)}
              >
                -
              </button>
            </div>
          </div>

          <button
            className="addToCart"
            onClick={() => props.addToCart(jewel.id)}
          >
            ADD TO CART
          </button>
          <div onClick={giftwrap} className="gift">
            ADD BOX AND GIFT BAG
          </div>
        </div>
      </div>
    </div>
  );
}
