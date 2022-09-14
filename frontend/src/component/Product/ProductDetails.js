import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails } from "../../actions/productAction"
import ReactStars from "react-rating-stars-component"

// import { useParams } from "react-router-dom";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.productDetails);
  useEffect(() => {

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      <div className='ProductDetails'>
        <div>
          <Carousel>
            {product.images && [product.images].map((item, i) => (
              <img
                className="CarouselImage"
                key={item.url}
                src={item.url}
                alt={`${i} Slide`}
              />)

            )
            }
          </Carousel>
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
                <input readOnly type="number" />
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

          <button  className="submitReview">
            Submit Review
          </button>
        </div>
      </div>



    </Fragment>
  )
}


export default ProductDetails