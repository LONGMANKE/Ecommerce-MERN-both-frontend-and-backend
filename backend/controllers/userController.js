const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const { findById } = require("../models/userModel");
const cloudinary = require("cloudinary");


exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    //before cloudary
    // avatar: {
    //   public_id: "This is a simple id",
    //   url: "profilepicUrl",
    // },

    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
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
  const isPasswordMatched = await user.comparePassword(password);

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



// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //b4 deployment
  // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  //after deployment
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;


  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

  //creating token hash 
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })


  if (!user) {
    return next(new ErrorHandler("Reset password Token is invalid or has expired", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);

})

//Get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  // we wont use this coz its implemented in the isauthor authenticated if(!user)
  res.status(200).json({
    success: true,
    user,
  })
})

//Update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);


  // we wont use this coz its implemented in the isauthor authenticated if(!user)
  // res.status(200).json({
  //   success: true,
  //   user,
  // })
})

//Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }

  //we will add cloudinary later
  //added

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  //sendToken(user, 200,res);


  res.status(200).json({
    success: true,
    user,
  })
})


//get all users Admin

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,

  })
})
//get single user Admin

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User doen't exist with id ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    user,

  })
})

//Update user role admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,

  }

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  //sendToken(user, 200,res);


  res.status(200).json({
    success: true,
  })
})
//Delete user Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.params.id)

  //we will remove cloudinary later
  
  if (!user) {
    return next(new ErrorHandler(`User doen't exist with id ${req.params.id}`));
  }
  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);
  await user.remove();
  //sendToken(user, 200,res);


  res.status(200).json({
    success: true,
    message: "User Deleted Successfully"
  })
})


