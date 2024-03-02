const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require('cloudinary');
const getDataUri = require("../utils/dataUri");
const Category = require("../models/categoryModel");
const Subcategory = require("../models/subcategoryModel");
const SubSubcategory = require("../models/subsubcategoryModel");
// const {Category,Subcategory} = require('../models/categoryModel')


// Create Category

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  
  // let file = req.body.file;

  // if (!file) {
  //   return next(new Errorhandler('File not Found', 404))
  // }
  // if (!req.body.name) {
  //   return next(new Errorhandler('File not Found', 404))
  // }

  // // const filesUri = getDataUri(file);

  // const result = await cloudinary.v2.uploader.upload(file, {
  //   folder: 'category'
  // });


  // let image = {
  //   public_id: result.public_id,
  //   url: result.url

  // }

  // req.body.image = image;
  
  // const category = await Category.create(req.body)
  // res.status(201).json({ success: true, message: 'New Category Created successfully' });



 let file = req.body.file;

  if (!file) {
    return next(new Errorhandler('File not Found', 404))
   }

  const { name } = req.body;
   if (!name) {
       return next(new Errorhandler('Name not Found', 404))
     }

 const result = await cloudinary.v2.uploader.upload(file, {
    folder: 'category'
  });


  let image = {
    public_id: result.public_id,
    url: result.url

  }

  req.body.image = image;


     const newCategory = await Category.create(req.body);

  res.status(201).json({ success: true, message: 'New Category Created successfully' });


})

// subcategory within a category

exports.createSubcat = catchAsyncErrors(async(req, res, next)=>{

  // const categoryId = req.params.categoryId;

  // let file = req.body.file;

  // if (!file) {
  //   return next(new Errorhandler('File not Found', 404))
  // }
  // if (!req.body.name) {
  //   return next(new Errorhandler('File not Found', 404))
  // }


  // const category = await Category.findById(categoryId);
  // if (!category) {
  //   return next(new Errorhandler('Category not Found', 404))
  // }


  // const result = await cloudinary.v2.uploader.upload(file, {
  //   folder: 'subcategory'
  // });


  // let image = {
  //   public_id: result.public_id,
  //   url: result.url

  // }


  // req.body.image = image;
  // const newSubcategory = await Subcategory.create(req.body);

  // category.subcategories.push(newSubcategory);
  // await category.save();

  // res.status(201).json({ success: true, message: 'New SubCategory Created successfully' });


  const { name } = req.body;
  const { categoryId } = req.params;
   let file = req.body.file;

  if (!file) {
    return next(new Errorhandler('File not Found', 404))
  }
  if (!name) {
    return next(new Errorhandler('Name not Found', 404))
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    return next(new Errorhandler('Category not Found', 404))
  }


    const result = await cloudinary.v2.uploader.upload(file, {
    folder: 'subcategory'
  });


  let image = {
    public_id: result.public_id,
    url: result.url

  }


  req.body.image = image;

  const newSubcategory = await Subcategory.create(req.body);
  category.subcategories.push(newSubcategory);
  await category.save();


  res.status(201).json({ success: true, message: 'New SubCategory Created successfully' });


})


// create a new sub-subcategory within a subcategory

exports.createsubSubcat = catchAsyncErrors(async(req, res, next)=>{


  const { name } = req.body;
  const { subcategoryId } = req.params;

  const subcategory = await Subcategory.findById(subcategoryId);
  if (!subcategory) {
    return next(new Errorhandler('Sub-Category not Found', 404))
  }

  const newSubSubcategory = await SubSubcategory.create({ name });
  subcategory.subSubcategories.push(newSubSubcategory);
  await subcategory.save();


  res.status(201).json({ success: true, message: 'New Sub-SubCategory Created successfully' });


})





// get Category

exports.getCategory = catchAsyncErrors(async (req, res, next) => {
  
  let categoryId = req.params.categoryId;
    
  const category = await Category.findById(categoryId);
  if (!category) {
    return next(new Errorhandler('Categories not Found', 404))
  }

  res.status(201).json({ success: true, category });

})


// get sub-Categories

exports.getSubCategory = catchAsyncErrors(async (req, res, next) => {
  
  let categoryId = req.params.categoryId;
    
  const category = await Category.findById(categoryId).populate('subcategories')
  if (!category) {
    return next(new Errorhandler('Categories not Found', 404))
  }
  
  let subcategory = category?.subcategories;

  res.status(201).json({ success: true, subcategory });

})
// get sub-subCategories

exports.getSubSubCategory = catchAsyncErrors(async (req, res, next) => {
  
  let subcategoryId = req.params.id;
    
  const subcategory = await Subcategory.findById(subcategoryId).populate('subSubcategories')
  if (!subcategory) {
    return next(new Errorhandler('Categories not Found', 404))
  }
  
  let subSubcategory = subcategory?.subSubcategories;

  res.status(201).json({ success: true, subSubcategory });

})



// get all Categories

exports.allCategory = catchAsyncErrors(async (req, res, next) => {
    
    const category = await Category.find();
    if (!category) {
      return next(new Errorhandler('Categories not Found', 404))
    }

    res.status(201).json({ success: true, category });

  })


  // delete A Category 

exports.deletecategory = catchAsyncErrors(async (req, res, next) => {

    const category = await Category.findById(req.params.id)
 

    if(!category){
      return next(new Errorhandler(`category not found with the given id ${req.params.id}`,400))
    }

    const imageId = category?.image?.public_id;

await cloudinary.v2.uploader.destroy(imageId)

await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success:true,
    message:'Category deleted successfully'
  })
  
  
  })



// get sub-SubCategories

exports.getsub_SubCategory = catchAsyncErrors(async (req, res, next) => {
  
  let subcategoryId = req.params.subcategoryId;
    
  const sub_category = await Subcategory.findById(subcategoryId).populate('subSubcategories')
  if (!sub_category) {
    return next(new Errorhandler('Categories not Found', 404))
  }
  
  let subSubcategory = sub_category?.subSubcategories;

  res.status(201).json({ success: true, subSubcategory });

})
