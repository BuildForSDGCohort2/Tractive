const express = require("express");
const router = express.Router();

// const {
//     agentLogin,
//     agentApplication,
//     getAgents, 
//     agentLogout
// } = require("../controllers/agentsController");

const { agentLogin,
    agentApplication,
    forgotPassword,
    resetPassword,
    updatePassword,
    updatePasswordViaEmail,
    getAgents, 
    findUser,
    deleteUser,
    updateUser} = require("../controllers/agentsControllers")


// owner routes
// router.get('/', getAgents);
// router.post('/signup', agentApplication);
// router.post('/signin', agentLogin);
// router.get('/logout', agentLogout);

// owners routes ownersControllers
router.get('/', getAgents);
router.post('/signup', agentApplication);
router.post('/signin', agentLogin);
router.get('/find-user', findUser);
router.get('/forgot-password', forgotPassword);
router.get('/reset-password', resetPassword);
router.get('/update-password', updatePassword);
router.get('/update-password-via-email', updatePasswordViaEmail);
router.delete('/delete-user', deleteUser)
router.put('/updateUser', updateUser)





module.exports = router; 