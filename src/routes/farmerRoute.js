const express = require("express");
const router = express.Router();

// const { 
//     farmerLogin, farmerApplication, getFarmers, farmerLogout
// } = require("../controllers/farmersController"); 

const {
    farmerLogin, farmerApplication, forgotPassword, resetPassword, updatePassword, updatePasswordViaEmail, getFarmers, findUser, deleteUser, updateUser, farmerLogout
} = require("../controllers/farmersControllers")

// user routes farmersController
// router.get('/', getFarmers);
// router.post('/signup', farmerApplication);
// router.post('/signin', farmerLogin);
// router.get('/logout', farmerLogout);


// user routes farmersControllers
router.get('/', getFarmers);
router.post('/signup', farmerApplication);
router.post('/signin', farmerLogin);
router.get('/find-user', findUser);
router.get('/logout', farmerLogout);
router.post('/forgot-password', forgotPassword);
router.get('/reset', resetPassword);
router.put('/update-password', updatePassword);
router.put('/update-password-via-email', updatePasswordViaEmail);
router.delete('/delete-user', deleteUser)
router.put('/updateUser', updateUser)


module.exports = router; 