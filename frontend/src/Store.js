import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer} from "./reducers/orderReducer";

const reducer = combineReducers({ 
  // products: productReducer.apply,
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer, 
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  users: allUsersReducer,
 AllOrders:  allOrdersReducer,
 product: productReducer,
 order: orderReducer,
 userDetails: userDetailsReducer,
 


});
  
  let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shipping Info")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };
  
  const middleware = [thunk];
  
  const store = createStore( 
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export default store; 