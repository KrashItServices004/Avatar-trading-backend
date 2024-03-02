const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const PopularProduct = require("../models/popularProductModel");


// add a popular product

exports.addpopularproduct = catchAsyncErrors(async (req, res, next) => {

    let productId = req.body.productId


    if (!productId) {
        return next(new Errorhandler('productId not Found', 404))

    }

    let prod = await Product.findById(productId)

    if (!prod) {
        return next(new Errorhandler('Product not Found', 404))

    }


    let popularprod = await PopularProduct.create({ product: productId })



    res.status(201).json({ success: true, message: 'Popular Product Added' });


})






// remove a popular product

exports.removepopularproduct = catchAsyncErrors(async (req, res, next) => {

    let ppId = req.params.ppId

    if (!ppId) {
        return next(new Errorhandler('productId not Found', 404))

    }

    let product = await PopularProduct.findById(ppId)

    if (!product) {
        return next(new Errorhandler('Product not Found', 404))

    }

    let removedprod = await PopularProduct.findByIdAndDelete(ppId);



    res.status(201).json({ success: true, message: 'popular product Removed' });


})


// get all popular product

exports.allpopularproduct = catchAsyncErrors(async (req, res, next) => {



    let allproduct = await PopularProduct.find().populate('product')

    if (!allproduct) {
        return next(new Errorhandler('Product not Found', 404))

    }


    res.status(201).json({ success: true, allproduct });


})