
import React, { Fragment, useEffect } from "react";
import "./Products.css"
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../../component/layout/MetaData"

const Products = ({match}) => {

    const dispatch = useDispatch();

    const { loading, products } = useSelector((state) => state.products);

const keyword = match.params.keyword;

    useEffect(() => {
        dispatch(getProduct(keyword))
    }, [dispatch,keyword]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                     <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
                </Fragment>
            )}  
        </Fragment>
    )
}

export default Products 