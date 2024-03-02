const express = require('express');
const offersController = require('../controllers/offersController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


const router = express.Router();


router.post('/offer' , offersController.addoffer)
router.get('/offer' , offersController.getoffers)
router.delete('/offer/:id' , offersController.deleteoffer)





module.exports = router