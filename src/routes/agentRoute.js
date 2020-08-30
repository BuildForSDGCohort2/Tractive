const express = require("express");
const router = express.Router();

const {
    agentLogin,
    agentApplication,
    getAgents, 
    agentLogout
} = require("../controllers/agentsController");


// owner routes
router.get('/', getAgents);
router.post('/signup', agentApplication);
router.post('/signin', agentLogin);
router.get('/logout', agentLogout);



module.exports = router; 