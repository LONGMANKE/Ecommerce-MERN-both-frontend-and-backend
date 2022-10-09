const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//create A Product --Admin
// exports.createProduct = catchAsyncErrors(async (req, res, next) => {
//     req.body.user = req.user.id;
//     const product = await Product.create(req.body);
//     res.status(201).json({
//         success: true,
//         product,

//     })
// });
// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const avatar = [];

    for (let i = 0; i < images.length; i++) {
        const cloud = await cloudinary.v2.uploader.upload(images[i], {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        avatar.push({
            public_id: cloud.public_id,
            url: cloud.secure_url,
        });
    }

    req.body.images = avatar;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    // return next(new ErrorHandler("This is my temp error", 500));
    const resultPerPage = 6;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()

    // .pagination(resultPerPage);
    // const products = await apiFeature.query;


    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query.clone();




    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,

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

    ////check well on above code
    // const productsCount = await Product.countDocuments();

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
                product

            }
        );
    }

}
);

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});
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
            product

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
            message: "Product deleted successfully"

        })
    }
});

//create review or update review


exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        rev => rev.user.toString() === req.user._id)
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev => rev.user.toString() === req.user._id)
                rev.rating = rating,
                    rev.comment = comment
        })
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }


    let avg = 0;
    // 4,5,5,2 = 166/==4=4
    product.reviews.forEach(rev => {
        avg = avg + rev.rating

        //avg+= rev.rating

    })

    product.ratings = avg / product.reviews.length

    await product.save({
        validateBeforeSave: false
    })
    res.status(200).json({
        success: true,
    })
});

//Get all reviews  
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })

})

//Delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

    let avg = 0;
    // 4,5,5,2 = 166/==4=4
    reviews.forEach(rev => {
        avg = avg + rev.rating

        //avg+= rev.rating

    })

    const ratings = avg / reviews.length
    const numOfReviews = reviews.length
    await Product.findByIdAndUpdate(req.query.productId, {
        ratings, reviews, numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,

    })
})