const express = require("express");

const { 
    userLogin, userApplication, getUsers, userLogout
} = require("../controllers/auth"); 

const router = express.Router();

// user routes
router.get('/', getUsers);
router.post('/signup', userApplication);
router.post('/signin', userLogin);
router.get('/logout', userLogout);

module.exports = router; 