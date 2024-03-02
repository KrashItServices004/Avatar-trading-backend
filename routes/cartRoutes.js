const express = require('express');
const cartController = require('../controllers/cartController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/cart', isAuthenticatedUser, cartController.addtocart);
router.get('/cart', isAuthenticatedUser, cartController.mycart);
router.put('/cart', isAuthenticatedUser, cartController.removefromcart);




module.exports = router