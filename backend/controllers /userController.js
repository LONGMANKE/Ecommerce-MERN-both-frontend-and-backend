const User = require("../models/userModel")

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.registerUser = catchAsyncErrors(async(req,res,next) =>{
    
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
  
  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
   token,
   //user,

});
});

//Login user
exports.loginUser = catchAsyncErrors(async (req,res,next) =>{
    const{email,password}= req.body;

    //checking if user has given password 
    if(!email || !password){
        
    }
})