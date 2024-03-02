const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");


// add a product to cart 

exports.addtocart = catchAsyncErrors(async (req, res, next) => {

    let productId = req.body.productId
    let quantity = req.body.quantity


    if (!productId) {
        return next(new Errorhandler('productId not Found', 404))

    }

    let prod = await Product.findById(productId)

    if (!prod) {
        return next(new Errorhandler('Product not Found', 404))

    }

    let loginuser = await User.findById(req.user._id);
    
    if (!loginuser) {
        return next(new Errorhandler('Please Login First', 404))
        
    }
    
    let existingcart = await Cart.find({ user: loginuser._id });


    if(existingcart.length>=1){
        let existingItem = existingcart[0].products.find((item) => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += existingItem.quantity
            await existingcart[0].save()

        } else {
            existingcart[0].products.push({
                product: productId,
                quantity
            })
            // console.log(existingcart[0].products);
             await existingcart[0].save()

        }
    
    }



    if (existingcart.length<1) {
        let productss = [];

        productss.push({
            product: productId,
            quantity: quantity
        })

        req.body.products = productss;
        req.body.user = loginuser._id;

        const cart = await Cart.create(req.body)
    }



    res.status(201).json({ success: true, message: 'product added to cart' });


})


// get cart for login user

exports.mycart = catchAsyncErrors(async (req, res, next) => {

  

    let loginuser = await User.findById(req.user._id);
    
    if (!loginuser) {
        return next(new Errorhandler('Please Login First', 404))
        
    }
    
    let existingcart = await Cart.find({ user: loginuser._id }).populate('products.product')




    res.status(201).json({ success: true, cart:existingcart[0] });


})



// remove a product to cart 

exports.removefromcart = catchAsyncErrors(async (req, res, next) => {

    let productId = req.body.productId

    if (!productId) {
        return next(new Errorhandler('productId not Found', 404))

    }

    let product = await Product.findById(productId)

    if (!product) {
        return next(new Errorhandler('Product not Found', 404))

    }

    let loginuser = await User.findById(req.user._id);
    if (!loginuser) {
        return next(new Errorhandler('Please Login First', 404))
        
    }
    
    let existingcart = await Cart.find({ user: loginuser._id });


    let updatedcart = existingcart[0].products.filter((item) => item.product.toString() !== productId);

    existingcart[0].products=updatedcart;

    await existingcart[0].save()


   


    res.status(201).json({ success: true, message: 'product Removed from cart' });


})