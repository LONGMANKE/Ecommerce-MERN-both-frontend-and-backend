const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview, getProductReviews, getAdminProducts, } = require("../controllers/productControllers");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizedRoles("Admin"), createProduct);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAdminProducts);
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizedRoles("Admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles("Admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview); 

module.exports = router;