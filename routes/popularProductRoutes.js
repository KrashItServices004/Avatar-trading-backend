const express = require('express');
const popularProductController = require('../controllers/popularProductController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/popularproduct', popularProductController.addpopularproduct);
router.get('/popularproduct', popularProductController.allpopularproduct);
router.delete('/popularproduct/:ppId', popularProductController.removepopularproduct);




module.exports = router