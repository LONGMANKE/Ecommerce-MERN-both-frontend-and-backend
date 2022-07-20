const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")



exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    //if it is just token with no {} the token will be siplayed in the terminal as {tjhsvfdgvshd}    
    const { token } = req.cookies;
    //to see in  console.log(token);

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    };

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource `,
                 403
                 ));
        };

        next();
    };
};