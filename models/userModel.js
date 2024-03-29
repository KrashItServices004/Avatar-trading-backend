const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: [true, "Please Enter your Name"],
  //   maxLength: [30, "Name Cannot Exceed 30 characters"],
  //   minLength: [3, "Name should have more than 3 characters"],
  // },
  email: {
    type: String,
    required: [true, "Please Enter your Email/Phone"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password Should be greater than 8 characters"],
    select: false,
  },
  // avatar: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: {
    type:mongoose.Schema.ObjectId,
    ref:'Cart'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  resetPasswordToken: String,
  reserPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});


// JWT TOKEN

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



// Generating Password Reset token

userSchema.methods.getResetPasswordToken = function () {
  // Generaing Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.reserPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);