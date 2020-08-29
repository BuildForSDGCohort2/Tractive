const Fleet = require("../models/fleetsModel"); 



// get all fleets 
const getFleets = async (req, res, next) => {
    Fleet.find()
    .then(data => res.json(data)) 
    .catch(error => res.status(400).json("Error: " + error)); 
};


//   post fleets
const postFleets = async (req, res) => {    

    const { name, description, purpose, image, availability } = req.body

    const newFleet = new Fleet({
        name, description, purpose, image, availability
        
    })

    newFleet 
    .save()
    .then((data) =>{
        res.json(data);
    })
    .catch((error) =>{
        console.log(error); 
    });
};


module.exports = {
    postFleets,
    getFleets 
  
}; 