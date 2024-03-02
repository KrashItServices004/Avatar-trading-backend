const express = require('express');
const addressController = require('../controllers/addressController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


const router = express.Router();


router.post('/address' , addressController.createaddress)
router.get('/address' , addressController.getaddress)
router.delete('/address/:addressId' , addressController.deleteaddress)





module.exports = router