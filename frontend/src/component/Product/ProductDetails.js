import React, { Fragment, useEffect } from 'react'
// import Carousel from "react-material-ui-carousel"
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux"
import {  getProductDetails } from "../../actions/productAction"
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader';
// import { useAlert } from "react-alert";
// import {useParams} from "react-router-dom"


// import { useParams } from "react-router-dom";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  // const alert = useAlert();


  const {  loading,  product } = useSelector((state) => state.productDetails);
  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  // const { id } = useParams();
  // dispatch(getProductDetails(id));

    // if(error){ 
    //   alert.error(error);
    //   dispatch(clearErrors())
    // }
  }, [dispatch, match.params.id]);
  
 
  const options = {
    size: "large",  
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className='ProductDetails'>
            <div>

              {product.images && [product.images].map((item, i) => (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                />)

              )
              }
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`KSH ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button >-</button>
                    <input value="1" type="number" />
                    <button >+</button>
                  </div>
                  <button>
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>

  )
}


export default ProductDetails

