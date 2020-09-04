const express = require("express");
const app = express(); 
const router = express.Router();

const { forwardAuthenticated } = require('../config/auth');


const {
    ownerLogin,
    ownerApplication,
    getOwners, 
    ownerLogout
} = require("../controllers/ownersController"); 

// owner routes
router.get('/', getOwners);
router.post('/signup',   ownerApplication);
router.post('/signin', ownerLogin);
router.get('/signout', ownerLogout);



module.exports = router; 