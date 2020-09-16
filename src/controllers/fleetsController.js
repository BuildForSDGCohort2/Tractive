const Fleet = require("../models/fleetsModel"); 
// const { upload } = require("../utility/multer"); 
const responseHandler = require('../utility/responseHandler');
const fs = require('fs'); 
const path = require('path'); 
// const sharp = require('sharp'); 
   



// get all fleets 
const getFleets = async (req, res, next) => {
   const fleets = Fleet.find({})
    .then(fleets =>
        // res.render("index", { Images: Images }) 
        res.json(fleets)
        ) 
    .catch(error => res.status(400).json("Error: " + error)); 
};

// New route: form to add new fleet
const getNewFleet = async (req, res, next) => {
    res.render("new"); 
    }

//   post fleets
const postFleets =  async (req, res) => {    

    const { name, desc, purpose, image, availability } = req.body

    const newFleet = new Fleet({
        name, 
        desc, 
        purpose, 
        availability, 
        // image: {
        //     data: fs.readFileSync(path.join(__dirname + '/public/products/' + req.file.filename)) 
		// 	// contentType: 'image/png' || 'image/jpg'  || 'image/jpeg' 
        // }
        
        
    })
    // sharp(__dirname + '/public/products/image.jpg').resize(200,200) 
    // .jpeg({quality : 50}).toFile(__dirname  
    //     + '/public/products/image_thumb.jpg'); 
  
  
    // sharp(__dirname + '/public/products/image.jpg').resize(640,480) 
    // .jpeg({quality : 80}).toFile(__dirname  
    //     + '/public/products/image_preview.jpg'); 
  
    
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
        } else{
            // res.render("edit", {fleet: foundFleet})
            
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
    Fleet.findByIdAndDelete(req.params.id)
      .then(() => res.json(`${req.params.id}: deleted`))
      .catch(err => res.status(400).json('Error: ' + err));
  };


module.exports = {
    postFleets,
    getNewFleet,
    getFleets,
    showFleet,
    editFleet,
    updateFleet,
    deleteFleet  
  
}; 