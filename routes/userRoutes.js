const express = require('express');
const userController = require('../controllers/userController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


const router = express.Router();


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logout)
router.post('/password/forgot', userController.forgotPassword)
router.put('/password/reset/:token', userController.resetPassword)
router.get('/me', isAuthenticatedUser, userController.getUserDetails)
router.put('/password/update', isAuthenticatedUser, userController.updatePassword)
router.put('/me/update', isAuthenticatedUser, userController.updateProfile)
router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin') ,userController.getAllUsers)
router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin') ,userController.getSingleUser)
router.put('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin') ,userController.updateRole)
router.delete('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin') ,userController.deleteUser)



module.exports = router