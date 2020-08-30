const express = require("express");
const router = express.Router();

const { 
    userLogin, userApplication, getUsers, userLogout
} = require("../controllers/farmersController"); 



// user routes
router.get('/', getUsers);
router.post('/signup', userApplication);
router.post('/signin', userLogin);
router.get('/logout', userLogout);



module.exports = router; 