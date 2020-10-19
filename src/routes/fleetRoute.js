const express = require("express");
const router = express.Router();
const { upload } = require("../utility/multer"); 

const {
    getFleets, postFleets, showFleet, editFleet, updateFleet, deleteFleet, getNewFleet   
} = require("../controllers/fleetsController")

// fleet routes
router.get("/", getFleets);
router.post("/", upload.single('image'), postFleets);
router.get("/:id", showFleet);
router.get("/:id/edit", editFleet);
router.post("/:id", updateFleet);
router.delete("/delete/:id", deleteFleet);

module.exports = router; 