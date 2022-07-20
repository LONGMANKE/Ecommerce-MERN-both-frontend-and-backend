const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a simple id",
      url: "profilepicUrl",
    },
  });

  //before use of jwtToken in utils this was the code
  /* const token = user.getJWTToken();
 
   res.status(201).json({
     success: true,
    token,
    //user,
 
 });
 */
  //After

  sendToken(user, 201, res)



});
//
//Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password or email
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401))
  }
  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401))
  }
  sendToken(user, 200, res)


});
//before use of jwtToken in utils this was the code
/*  const token = user.getJWTToken();

res.status(201).json({
  success: true,
 token,
 //user,
  
});
*/
//from the jwtToken in utils




//Logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out"
  });
});


//Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }
  //Get resetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n`

})
