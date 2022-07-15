const Product = require("../models/productModel")


exports.getAllProducts = (req, res ) =>{
    res.status(200).json({message:"Route is working successful"})
}