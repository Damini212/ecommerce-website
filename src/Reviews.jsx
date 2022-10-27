import React from "react";
import "./Reviews.css";
import { FaStar } from "react-icons/fa";

export default function Reviews() {
  const [review, setReview] = React.useState({
    firstName: "",
    lastName: "",
    comments: "",
    stars: 0,
  });
  const [reviewsList, setReviewsList] = React.useState([]);
  const [hoverValue, setHoverValue] = React.useState();
  const star = Array(5).fill(0);
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  function handleClick(value) {
    setReview({ ...review, stars: value });
  }
  function handleMouseOver(newHoverValue) {
    setHoverValue(newHoverValue);
  }

  function handleMouseLeave() {
    setHoverValue(0);
  }
  function handleChange(event) {
    setReview({ ...review, [event.target.name]: event.target.value });
  }

  function onSubmit(event) {
    event.preventDefault();
    if (
      review.stars === 0 ||
      review.firstName === "" ||
      review.lastName === "" ||
      review.comments === ""
    ) {
      alert("please fill all the details");
    } else {
      setReviewsList(reviewsList.concat(review));
      setReview({
        firstName: "",
        lastName: "",
        comments: "",
        stars: 0,
      });
    }
  }
  return (
    <div className="review-wrapper">
      <h1>Customers review</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={review.firstName}
          onChange={handleChange}
          className="firstName"
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={review.lastName}
          onChange={handleChange}
          className="lastName"
        />
        <div className="stars">
          Rating:
          {star.map((item, index) => {
            return (
              <FaStar
                className="star"
                key={index}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue || review.stars) > index
                    ? colors.orange
                    : colors.grey
                }
              />
            );
          })}
        </div>

        <textarea
          rows={10}
          column={10}
          type="text"
          placeholder="write your review"
          onChange={handleChange}
          value={review.comments}
          className="text-area"
          name="comments"
        />
        <br></br>
        <button className="submit-btn" onClick={onSubmit}>
          Submit
        </button>
      </form>
      <div>
        {reviewsList.map((item) => {
          return (
            <div>
              <div>
                {star.map((_, index) => {
                  return (
                    <FaStar
                      className="star"
                      key={index}
                      color={item.stars > index ? colors.orange : colors.grey}
                    />
                  );
                })}
              </div>
              <div>
                {item.firstName} {item.lastName}
              </div>

              <div>{item.comments}</div>
              <br></br>
            </div>
          );
        })}
      </div>
    </div>
  );
}
