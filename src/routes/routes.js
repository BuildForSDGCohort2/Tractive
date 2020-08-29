const express = require("express");
const router = express.Router();

const { 
    userLogin, userApplication, getUsers, userLogout
} = require("../controllers/auth"); 

const {
    getFleets, postFleets
} = require("../controllers/fleetsController")



// user routes
router.get('/', getUsers);
router.post('/signup', userApplication);
router.post('/signin', userLogin);
router.get('/logout', userLogout);

// fleet routes
router.get("/fleets", getFleets)
router.post("/fleets", postFleets)





module.exports = router; 