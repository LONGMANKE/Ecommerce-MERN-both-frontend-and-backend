const ErrorHandler =  require ("../utils/errorhandler");


module.exports = (err, req, res, next) => {
err.statusCode = err.statusCode || 500; 
err.message = err.message || "internal server Error";


//Wrong Mongodb Id error maybe if we input a short id 
if(err.name === "CastError"){
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
}

//Mongoose dublicate key error

if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandler(message, 400);

}

//Wrong JWT error
if(err.name === "TokenExpiredError"){
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
}
//JWT expire error
if(err.name === "JsonWebTokenError"){
    const message = `Json Web Token is expired, try again`;
    err = new ErrorHandler(message, 400);
}

res.status(err.statusCode).json({
    success : false, 
    message : err.message,
});
};
