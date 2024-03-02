const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Bulkorder = require("../models/bulkorderModel");


// create bulk order 
exports.createbulkorder = catchAsyncErrors(async (req, res, next) => {


    let { name, phone, location, requirementdetail } = req.body;

    if (!name && !phone && !location && !requirementdetail) {
        return next(new Errorhandler('Please Fill Full Form', 404))
    }

    const add = await Bulkorder.create(req.body)
    res.status(201).json({ success: true, message: 'New Address Created successfully' });



})
