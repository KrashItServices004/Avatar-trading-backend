const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary')


// create product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body);

  // console.log(req.body.stripes);
  let stripes = JSON.parse(req.body.stripes)



  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images;
  }


  let imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products'
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    })


  }

  req.body.images = imagesLink;

  // console.log(stripes[0].pic.length > 0);

  if (stripes[0].pic.length > 0) {


    let stripeimage = [];

    for (let i = 0; i < stripes.length; i++) {
      const result = await cloudinary.v2.uploader.upload(stripes[i].pic, {
        folder: 'stripes'
      });
      // console.log(result);
      stripeimage.push({
        public_id: result.public_id,
        url: result.secure_url,
      })
    }

    // console.log(stripeimage[0]);

    for (let i = 0; i < stripeimage.length; i++) {
      // console.log(stripeimage[i]);
      stripes[i].pic = stripeimage[i]
    }

    // console.log(stripes);

    req.body.stripes = stripes;

  }else{

    req.body.stripes = [];
  }


  // console.log(req.body);

  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// get all product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = 8;
  const productCount = await Product.countDocuments()


  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
  let products = await apifeatures.query.clone();
  let filteredProductsCount = products.length;
  apifeatures.pagination(resultPerPage);

  products = await apifeatures.query;

  res.status(200).json({ success: true, products, productCount, resultPerPage, filteredProductsCount });
});


// update product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not Found", 404));
  }

  // Images start here 
  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images != undefined) {

    // Deleting Images from cloudinary 
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'products',
      })

      imagesLink.push({
        public_id: result.public_id,
        url: result.url
      })

      req.body.images = imagesLink;

    }


  }



  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({ success: true, updatedProduct });
});


// get all product --(ADMIN)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

  const products = await Product.find().populate('category').populate('subcategory')

  res.status(200).json({ success: true, products });
});


// get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not Found", 404));
  }
  res.status(200).json({ success: true, product });
});



// delete product --Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not Found", 404));
  }

  //  Deleting images from cloudinary 
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id)

  }

  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Product Deleted SuccessFully" });
});