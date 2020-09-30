const express = require("express");
const app = express(); 
const router = express.Router();

const { forwardAuthenticated } = require('../config/auth');

const {
    ownerLogin,
    ownerApplication,
    forgotPassword,
    resetPassword,
    updatePassword,
    updatePasswordViaEmail,
    getOwners, 
    findUser,
    deleteUser,
    updateUser
} = require("../controllers/ownersControllers")


// const {
//     ownerLogin,
//     ownerApplication,
//     getOwners, 
//     ownerLogout
// } = require("../controllers/ownersController"); 

// owner routes
// router.get('/', getOwners);
// router.post('/signup',   ownerApplication);
// router.post('/signin', ownerLogin);
// router.get('/signout', ownerLogout);


// owners routes ownersControllers
router.get('/', getOwners);
router.post('/signup', ownerApplication);
router.post('/signin', ownerLogin);
router.get('/find-user', findUser);
router.get('/forgot-password', forgotPassword);
router.get('/reset-password', resetPassword);
router.get('/update-password', updatePassword);
router.get('/update-password-via-email', updatePasswordViaEmail);
router.delete('/delete-user', deleteUser)
router.put('/updateUser', updateUser)


module.exports = router; 