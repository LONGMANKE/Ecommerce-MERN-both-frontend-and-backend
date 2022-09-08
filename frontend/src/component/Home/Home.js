import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux"
import Loader from '../layout/Loader/Loader';
// import { useAlert } from 'react-alert';




// const product = {
//   name: "blue tshirt",
//   images: [{ url: "https://5.imimg.com/data5/JH/SP/MY-33710583/men-s-blue-shirt-500x500.jpg" }],
//   price: "1000",
//   _id: "Simoo"
// }

const Home = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { loading,  products } = useSelector((state) => state.products);

  useEffect(() => { 
    // if (error) { 
    //   return alert.error(error);
    // }
    dispatch(getProduct());
  },
    [dispatch]);

  return (
    <Fragment>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="LONGMANKE SHOP" />
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

            {products &&
              products.map((product) =>
                <Product product={product} />
              )}
          </div>
        </Fragment>)}

    </Fragment>
 
  );

}

export default Home
