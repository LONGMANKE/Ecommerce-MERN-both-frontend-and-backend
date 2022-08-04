const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create new order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {

    const { 
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,} = req.body


        const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user:req.user._id   
        })
    res.status(201).json({
        success:true,
        order,
    })
})


//get single order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
const order= await Order.FindById(req.params.id).populate(
    "user",
    "name email"
    )
if(!order){
    return next(new ErrorHandler("Order not found with this Id", 404 ));
}
res.status(200).json({
    success:true,
    order,
})
})

//get Logged in User orders
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
    const order= await Order.FindById(req.params.id).populate(
        "user",
        "name email"
        )
    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404 ));
    }
    res.status(200).json({
        success:true,
        order,
    })
    })