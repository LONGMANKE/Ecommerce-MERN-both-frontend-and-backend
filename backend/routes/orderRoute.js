const express = require("express"); 
const { newOrder, getSingleOrder, myOrders } = require("../controllers /orderControllers");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");


router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, authorizedRoles("admin"), getSingleOrder)
router.route("/orders/me").get(isAuthenticatedUser, myOrders)

module.exports = router;