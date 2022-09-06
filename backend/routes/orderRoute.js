const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, UpdateOrder, deleteOrder } = require("../controllers/orderControllers");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");


router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)
router.route("/orders/me").get(isAuthenticatedUser, myOrders)
router
    .route("/admin/orders")
    .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders)
router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizedRoles("admin"), UpdateOrder)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder)
module.exports = router; 