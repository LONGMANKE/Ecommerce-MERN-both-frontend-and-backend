import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"


const Product= ({product}) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor:"tomato",
    size: window.innerWidth <600 ? 20 :25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images.url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span className="productCardSpan">
         
          ({product.numOfReviews}Reviews) 
        </span> 
      </div>
      <span>{`ksh ${product.price}`}</span>
    </Link>
  );
};

export default Product; 