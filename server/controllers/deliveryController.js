const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require('cloudinary');
const Delivery = require("../models/deliveryaddModel");


// create delivery address 
exports.createdelivery = catchAsyncErrors(async (req, res, next) => {


    let { name, distance, pincode } = req.body;

    if (!name && !distance && !pincode ) {
        return next(new Errorhandler('Please Fill Full Form', 404))
    }

    const add = await Delivery.create(req.body)
    res.status(201).json({ success: true, message: 'New Address Created successfully' });



})


// get all delivery address 
exports.getdelivery = catchAsyncErrors(async (req, res, next) => {



    const addresses = await Delivery.find()

    if(!addresses){
        return(next(new Errorhandler('Address not found', 404)))
    }


    res.status(201).json({ success: true, addresses });



})

// delete delivery address 
exports.deletedelivery = catchAsyncErrors(async (req, res, next) => {

    let deliveryId = req.params.deliveryId;

// console.log(deliveryId);
    const addresses = await Delivery.findById(deliveryId)

    if(!addresses){
        return(next(new Errorhandler('Address not found', 404)))
    }

    const deletedaddress = await Delivery.findByIdAndDelete(deliveryId)



    res.status(201).json({ success: true, message: 'Delivery Address Deleted Successfully' });



})