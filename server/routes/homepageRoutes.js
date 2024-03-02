const express = require('express');
const homepageController = require('../controllers/homepageController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const fileUpload = require('../middleware/multer');


const router = express.Router();


router.post('/banner' , homepageController.addhomebanner)
router.get('/banner', homepageController.gethomebanner);
router.delete('/banner/:id', homepageController.deletehomebanner)




module.exports = router