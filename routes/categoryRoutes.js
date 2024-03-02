const express = require('express');
const categoryController = require('../controllers/categoryController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const fileUpload = require('../middleware/multer');


const router = express.Router();


router.post('/admin/category' , categoryController.createCategory)
router.post('/admin/category/:categoryId/subcatergory' , categoryController.createSubcat)
router.post('/admin/subcatergory/:subcategoryId/subsubcatergory' , categoryController.createsubSubcat)
router.get('/admin/subcatergory/:id' , categoryController.getSubSubCategory)
router.get('/admin/category/:categoryId' , categoryController.getSubCategory)
router.get('/category/:categoryId' , categoryController.getCategory)
router.get('/admin/category' , categoryController.allCategory)
router.delete('/admin/category/:id' , categoryController.deletecategory)





module.exports = router