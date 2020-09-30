const contactModel = require("../models/contactModel");


const getContact = async (req, res, next) => {
    contactModel.find()
    .then(data => res.json(data)) 
    .catch(error => res.status(400).json("Error: " + error)); 
};

   //   contact
const postContact = (req, res) => {  
    const {
        name, email, subject, message 
    }  = req.body; 

    const contacts  = {
        name,  
        email,
        subject,
        message
      }; 

  contactModel.create(contacts)
//   console.log(contacts)
    .then(contacts => res.json(contacts)) 
    .catch(error => res.status(400).json("Error: " + error)); 
};

  module.exports = {
    getContact,
    postContact
}; 