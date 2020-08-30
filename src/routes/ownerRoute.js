const express = require("express");
const router = express.Router();

const {
    ownerLogin,
    ownerApplication,
    getOwners, 
    ownerLogout
} = require("../controllers/ownersController"); 

// owner routes
router.get('/', getOwners);
router.post('/signup', ownerApplication);
router.post('/signin', ownerLogin);
router.get('/logout', ownerLogout);



module.exports = router; 