import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      {/* {item.images.map(images => <img src={images.url} alt="ssa" />)} */}
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: KSH${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;