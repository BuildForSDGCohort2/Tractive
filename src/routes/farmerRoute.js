const express = require("express");
const router = express.Router();

const { 
    farmerLogin, farmerApplication, getFarmers, farmerLogout
} = require("../controllers/farmersController"); 



// user routes
router.get('/', getFarmers);
router.post('/signup', farmerApplication);
router.post('/signin', farmerLogin);
router.get('/logout', farmerLogout);



module.exports = router; 