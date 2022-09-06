import React, { Fragment,useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import {getProduct} from "../../actions/productAction";
import{useSelector, useDispatch} from "react-redux"



const product = {
  name: "blue tshirt",
  images: [{ url: "https://5.imimg.com/data5/JH/SP/MY-33710583/men-s-blue-shirt-500x500.jpg" }],
  price: "1000",
  _id: "Simoo"
}

const Home = () => {
const dispatch = useDispatch();
useEffect(() => {
dispatch(getProduct())
}, [dispatch])

  return <Fragment>
<MetaData title="LONGMANKE SHOP"/>
    <div className="banner">
      <p>Welcome to LongmanKE Shop</p>
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
      <ProductCard product={product} />

      <ProductCard product={product} />

      <ProductCard product={product} />

      <ProductCard product={product} />

      <ProductCard product={product} />

      <ProductCard product={product} />

      <ProductCard product={product} />


    </div>
  </Fragment>

}

export default Home