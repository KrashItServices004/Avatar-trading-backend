const express = require('express');
const productController = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// router.get('/product', productController.getAllProducts)
router.get('/admin/products' , productController.getAdminProducts)
router.post('/product',  productController.createProduct)
// router.put('/product/:id', productController.updateProduct)
router.delete('/product/:id',  productController.deleteProduct)
router.get('/product/:id',productController.getProductDetails)



module.exports = router