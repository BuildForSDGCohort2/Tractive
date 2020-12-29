const express = require("express");
const router = express.Router();
const checkToken = require("../middlewares/verifyToken")

// const { 
//     farmerLogin, farmerApplication, getFarmers, farmerLogout
// } = require("../controllers/farmersController"); 

const {
    farmerLogin, farmerApplication, forgotPassword, resetPassword, updatePassword, updatePasswordViaEmail, getFarmers, findUser, deleteUser, updateProfile, farmerLogout
} = require("../controllers/farmersControllers")

// user routes farmersControllers
router.get('/', checkToken, getFarmers);
router.post('/signup', farmerApplication);
router.post('/signin', farmerLogin);
router.get('/find-user', findUser);
router.get('/logout', farmerLogout);
router.post('/forgot-password', forgotPassword);
router.get('/reset', resetPassword);
router.put('/update-password', updatePassword);
router.put('/update-password-via-email', updatePasswordViaEmail);
router.delete('/delete-user', deleteUser)
router.put('/updateUser', updateProfile)


module.exports = router; 