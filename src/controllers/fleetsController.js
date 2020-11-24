const multer = require('multer');
const Fleet = require("../models/fleetsModel"); 
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwtConfig"); 
// const { upload } = require("../utility/multer"); 
// const responseHandler = require('../utility/responseHandler');
const fs = require('fs'); 
const path = require('path'); 
// const sharp = require('sharp'); 
   

// get all fleets 
const getFleets = (req, res, next) => {
   Fleet.find()
   .then((data) => {
    jwt.verify(req.token, jwtSecret.secret, data, (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the fleets route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            res.status(200).json(
                // message: '',
                // authorizedData,
                data,
            );
            console.log('SUCCESS: Connected to fleets');
        }
    })
});
};


//   post fleets
const postFleets =  async (req, res) => {    

    const { name, desc, purpose, ownerNumber, ownerEmail, ownerContact, chargePerAcre, image, availability } = req.body

    const newFleet = new Fleet({
        image,
        name, 
        desc, 
        purpose, 
        ownerNumber,
        ownerEmail,
        ownerContact,
        chargePerAcre,
        availability  
    })
      
    newFleet 
    .save()
    .then(() =>{
        return res.json("File Uploaded Successfully!"); 
    })
    .catch((error) =>{
        console.log(error); 
    });
};

// show one fleet
const showFleet = async (req, res, next) => {
    Fleet.findById(req.params.id)
      .then(fleet => res.json(fleet))
      .catch(err => res.status(400).json('Error: ' + err));
  };


// edit route
const editFleet = async (req, res, next) => {
    Fleet.findById(req.params.id, (err, foundFleet) =>{
        if(err){
            // res.redirect("/fleets")
            console.log(err)
        } else{
            // res.render("edit", {fleet: foundFleet})
            res.json(foundFleet)
        }
    });
};

  //   update fleet
  const updateFleet = (req, res, next) => {
    Fleet.findById(req.params.id)
      .then(fleet => {  
        fleet.name = req.body.name 
        fleet.description = req.body.description
        fleet.purpose = req.body.purpose
        fleet.ownerNumber = req.body.ownerNumber
        fleet.ownerContact = req.body.ownerContact
        fleet.ownerEmail = req.body.ownerEmail
        fleet.chargePerAcre = req.body.chargePerAcre
        fleet.image = req.body.image
        fleet.availability = req.body.availability    
  
        fleet.save()
          .then(() => res.json(`'Exercise updated!'`))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  };

//   delete 
const deleteFleet = async (req, res, next) => {
    Fleet.findByIdAndRemove(req.params.id)
      .then(() => res.json(`${req.params.id}: deleted`))
      .catch(err => res.status(400).json('Error: ' + err));
  };


module.exports = {
    postFleets,
    getFleets,
    showFleet,
    editFleet,
    updateFleet,
    deleteFleet  
  
}; 