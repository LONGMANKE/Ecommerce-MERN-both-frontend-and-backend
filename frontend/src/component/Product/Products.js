
import React, { Fragment, useEffect, useState } from "react";
import "./Products.css"
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../../component/layout/MetaData"
import Pagination from "react-js-pagination"
import { Slider } from '@mui/material';
import { Typography } from '@mui/material';

const Products = ({ match }) => {

    const dispatch = useDispatch();

    const [currentPage, setcurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 11000]);
    const { loading, products, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
        setcurrentPage(e);
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
      let count = filteredProductsCount;

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price))
    }, [dispatch, keyword, currentPage,price]);


   

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


                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={11000}
                        />
                        </div>

                        {resultPerPage < count && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Products 