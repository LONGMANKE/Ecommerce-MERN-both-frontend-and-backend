import React, { Fragment } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css";
import ProductCard from "./ProductCard.js";


const product = {
  name: "blue tshirt",
  images: [{url:"https://5.imimg.com/data5/JH/SP/MY-33710583/men-s-blue-shirt-500x500.jpg"}],
  price: "1000",
  _id :"Simoo"
}

const Home = () => {
  return <Fragment>

    <div className="banner">
      <p>Welcome to Ecommerce</p>
      <h1>FIND AMAZING PRODUCTS BELOW</h1>

      <a href="#container">
        <button>
          Scroll <CgMouse />
        </button>
      </a>
    </div>
    <h2 className="homeHeading">Featured Products</h2>

    <div className="container" id="container">

      <ProductCard product={product} />

    </div>
  </Fragment>

}

export default Home