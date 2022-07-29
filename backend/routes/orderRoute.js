const express = require("express");
const { newOrder } = require("../controllers /orderControllers");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");


router.route("/order/new").post(isAuthenticatedUser ,newOrder);


module.exports  = router;