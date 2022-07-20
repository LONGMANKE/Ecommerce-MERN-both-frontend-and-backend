const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, } = require("../controllers /productControllers");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, authorizedRoles("Admin"), createProduct);
router.route("/product/:id")
    .put(isAuthenticatedUser, authorizedRoles("Admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles("Admin"), deleteProduct)
    .get(getProductDetails);

module.exports = router;