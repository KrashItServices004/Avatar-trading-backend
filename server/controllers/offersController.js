const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Offers = require("../models/offersModel");
const cloudinary = require('cloudinary');



// add offer

exports.addoffer = catchAsyncErrors(async (req, res, next) => {


  let {file, title, description} = req.body;
  if (!file) {
    return next(new Errorhandler('File not Found', 404))
  }

  // const filesUri = getDataUri(file);

  const result = await cloudinary.v2.uploader.upload(file, {
    folder: 'offer'
  });

  let image = {
    public_id: result.public_id,
    url: result.url

  }

  req.body.offerimage = image;

  const offers = await Offers.create(req.body);
  res.status(201).json({ success: true, message: 'Offers Created successfully' });


})


// get offer

exports.getoffers = catchAsyncErrors(async (req, res, next) => {
  const offers = await Offers.find();
  if (!offers) {
    return next(new Errorhandler('Offfers not Found', 404))
  }

  res.status(201).json({ success: true, offers });


})


// delete offer

exports.deleteoffer = catchAsyncErrors(async (req, res, next) => {

  const id = req.params.id;
  const offer = await Offers.findById(id);

  if (!offer) {
    return next(new Errorhandler('Not Found, Invalid Id', 404));
  }

  const imageId = offer.offerimage.public_id;

await cloudinary.v2.uploader.destroy(imageId)

  const deletedoffer = await Offers.findByIdAndDelete(id);

  res.status(201).json({ success: true, message: 'Offer Deleted Successfully' });


})