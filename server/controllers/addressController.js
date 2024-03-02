const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require('cloudinary');
const Address = require("../models/addressModel");


// create address 
exports.createaddress = catchAsyncErrors(async (req, res, next) => {


    let { name, phone,area, pincode, address } = req.body;


    if (!name && !phone && !pincode && !address) {
        return next(new Errorhandler('Please Fill Full Form', 404))
    }

    const add = await Address.create(req.body)
    res.status(201).json({ success: true, message: 'New Address Created successfully' });



})


// get all  address 
exports.getaddress = catchAsyncErrors(async (req, res, next) => {



    const addresses = await Address.find()

    if(!addresses){
        return(next(new Errorhandler('Address not found', 404)))
    }


    res.status(201).json({ success: true, addresses });



})

// delete  address 
exports.deleteaddress = catchAsyncErrors(async (req, res, next) => {

    let addressId = req.params.addressId;

    const addresses = await Address.findById(addressId)

    if(!addresses){
        return(next(new Errorhandler('Address not found', 404)))
    }

    const deletedaddress = await Address.findByIdAndDelete(addressId)



    res.status(201).json({ success: true, message: 'Address Deleted Successfully' });



})