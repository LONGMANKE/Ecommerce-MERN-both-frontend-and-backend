const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create A Product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true, 
        product,

    })
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apiFeature.query;




    res.status(200).json({
        success: true,
        products,
        productsCount

    })
});

//This works collects all products 
/*
const products = await Product.find();
res.status(200).json({
    success: true,
    products,

})
});*/
//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    const productsCount = await Product.countDocuments();

    //before using clustered error handling
    /*if (!product) {
        res.status(500).json(
            {
                success: true,
                message: "Product not found"
            }
        )
    }*/
    if (!product) {
        return next(new ErrorHandler("Product not found, 404"));
    }
    else {
        res.status(200).json(
            {
                success: true,
                product,
                productsCount,
            }
        );
    }

}
);
//Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    /* if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        } */

    if (!product) {
        return next(new ErrorHandler("Product not found, 404"));
    }
    {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            product,

        })
    }

});

//Delete Product -- Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
    /*   if (!product) {
           return res.status(500).json({
               success: false,
               message: "Product not found"
           })
       }
   */
    if (!product) {
        return next(new ErrorHandler("Product not found, 404"));
    }
    else {
        product.remove()
        res.status(201).json({
            success: true,
            message: "Product deleted"

        })
    }
});