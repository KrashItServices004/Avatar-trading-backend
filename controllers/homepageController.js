const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Homepage = require("../models/homepageModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary');
const getDataUri = require("../utils/dataUri");
const homepageModel = require("../models/homepageModel");


// home page add banner 

exports.addhomebanner = catchAsyncErrors(async (req, res, next) => {

  // const file = req.file;
  // console.log(file);
  // console.log(req.body);
  // console.log(req.body.file);
  let file = req.body.file;

  if (!file) {
    return next(new Errorhandler('File not Found', 404))
  }

  // const filesUri = getDataUri(file);

  const result = await cloudinary.v2.uploader.upload(file, {
    folder: 'banners'
  });


  let image = {
    public_id: result.public_id,
    url: result.url

  }


  req.body.image = image;

  const banners = await Homepage.create(req.body);
  res.status(201).json({ success: true, message: 'Banner Uploaded successfully' });


})


// get home page banner 

exports.gethomebanner = catchAsyncErrors(async (req, res, next) => {

  const banners = await homepageModel.find();
  if (!banners) {
    return next(new Errorhandler('Banners not Found', 404))
  }

  res.status(201).json({ success: true, banners });


})


// delete home page banner 

exports.deletehomebanner = catchAsyncErrors(async (req, res, next) => {

  const id = req.params.id;

  const banner = await homepageModel.findById(id);

  if (!banner) {
    return next(new Errorhandler('Not Found, Invalid Id', 404));
  }

  const imageId = banner.image.public_id;

await cloudinary.v2.uploader.destroy(imageId)

  const deletedbanner = await homepageModel.findByIdAndDelete(id);

  res.status(201).json({ success: true, message: 'Banner Deleted Successfully' });


})