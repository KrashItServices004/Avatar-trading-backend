const express = require('express');
const deliveryController = require('../controllers/deliveryController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


const router = express.Router();


router.post('/delivery' , deliveryController.createdelivery)
router.get('/delivery' , deliveryController.getdelivery)
router.delete('/delivery/:deliveryId' , deliveryController.deletedelivery)





module.exports = router