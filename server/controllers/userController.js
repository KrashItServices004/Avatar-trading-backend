const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')



// Register a User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {


  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder:'avatars',
  //   width:150,
  //   crop:'scale',
  // })

  const {  email, password } = req.body;

  const user = await User.create({
    // name,
    email,
    password,
    // avatar: {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },
  });
 

  sendToken(user, 201, res);
});

// Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {


  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return next(new Errorhandler("Please Enter Your Email & Password", 400));
  }

  const user = await User.findOne({ email: email }).select('+password');

  if (!user) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);
 

  if (!isPasswordMatch) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

// logout user 

exports.logout = catchAsyncErrors( async (req, res, next)=>{

  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success:true,
    message:'Logged out '
  })
})


// Forgot password 

exports.forgotPassword = catchAsyncErrors( async(req, res, next)=>{

  const user = await User.findOne({email:req.body.email})

  if(!user){
    return next(new Errorhandler('User not Found'), 404)
  }

    // Get Reset password token 
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave:false })

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`

    try {

      await sendEmail({
        email:user.email,
        subject: `Ecommerce Password Recovery`,
        message,

      })

      res.status(200).json({
        success:true,
        message:`Email send to ${user.email} successfully`
      })

      
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.reserPasswordExpire = undefined;

     await user.save({ validateBeforeSave:false })
      return next(new Errorhandler(error.message, 500))

    }



})

// Reset Password 

exports.resetPassword = catchAsyncErrors( async (req, res, next)=>{

  // creating token hash 
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')


  const user = await User.findOne({
    resetPasswordToken, reserPasswordExpire : {$gt: Date.now()}
  })

  if(!user){
    return next(new Errorhandler('Reset Password token is invaliid or has been expired', 404))
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new Errorhandler('Password Does not Match', 404))

  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.reserPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res)


})


// Get user Details 
exports.getUserDetails = catchAsyncErrors(async (req, res, next)=>{
  
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success:true,
    user
  })

})


// update user password 

exports.updatePassword = catchAsyncErrors(async (req, res, next)=>{
  
  const user = await User.findById(req.user.id).select('+password');


  const isPasswordMatch = await user.comparePassword(req.body.oldPassword)
  

  if(!isPasswordMatch){
    return next(new Errorhandler('Old Password is incorrect', 400))
  }

  if(req.body.newPassword!==req.body.confirmPassword){
    return next(new Errorhandler('Password does not matched', 400))
  }

  user.password = req.body.newPassword;
  
  await user.save();
 

  sendToken(user, 200, res)

 
})


// update User Profile 
exports.updateProfile = catchAsyncErrors(async (req, res, next)=>{

  const newUserData = {
    name:req.body.name,
    email:req.body.email,
   
  }



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
    };
  }
 


  const user = await User.findByIdAndUpdate(req.user.id , newUserData , {new:true, runValidators:true })
  

  res.status(200).json({
    success:true,
   
  })

})

// Get all users (admin )
exports.getAllUsers = catchAsyncErrors( async(req, res, next)=>{

  const users = await User.find();

  res.status(200).json({
    success:true,
    users
  })

})

// Get Single User (admin)

exports.getSingleUser = catchAsyncErrors( async(req, res, next)=>{

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new Errorhandler(`User not exist with id ${req.params.id}`, 400))
  }

  res.status(200).json({
    success:true,
    user
  })

})


// update User Role -- Admin 
exports.updateRole = catchAsyncErrors(async (req, res, next)=>{

  const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
    
  }

  const user = await User.findByIdAndUpdate(req.params.id , newUserData , {new:true, runValidators:true })
  

  res.status(200).json({
    success:true,
    user
  })

})


// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next)=>{
 
 const user = await User.findById(req.params.id)
 

if(!user){
  return next(new Errorhandler(`user not found with the given id ${req.params.id}`,400))
}  

const imageId = user.avatar.public_id;

await cloudinary.v2.uploader.destroy(imageId)


await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success:true,
    message:'user deleted successfully'
  })

})