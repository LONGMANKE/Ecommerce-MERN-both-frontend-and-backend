import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails } from "../../actions/productAction"

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const { product } = useSelector(
    (state) => state.productDetails);

  useEffect(() => {

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Fragment>
      <div className='ProductDetails'>
      <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => 
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
              )
            }
          </Carousel>
        </div>

      </div>

    </Fragment>




  )
}


export default ProductDetails