const express = require("express");
const router = express.Router();
const checkToken = require("../middlewares/verifyToken")

const { upload } = require("../utility/multer"); 

const {
    getFleets, postFleets, showFleet, editFleet, updateFleet, deleteFleet,
} = require("../controllers/fleetsController")

// fleet routes
router.get("/", checkToken, getFleets);
router.post("/", postFleets);
// router.post("/upload", postImage);
router.get("/:id", showFleet);
router.get("/:id/edit", editFleet);
router.post("/:id", updateFleet);
router.delete("/delete/:id", deleteFleet);

module.exports = router; 