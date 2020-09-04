const bcrypt = require("bcryptjs");
const passport = require('passport');

const  Farmer = require("../models/farmerModel"); 

// const jwt       = require("jsonwebtoken"); 



const getFarmers = async (req, res, next) => {
    User.find()
    .then(data => res.json(data)) 
    .catch(error => res.status(400).json("Error: " + error)); 
};

//   signup 
const farmerApplication = async (req, res) => {    
    
    const { title, address, town, state, farmSize, farmAddress, crops, fullName, gender, email, phone,  country, password, password2   } = req.body
  let errors = [];

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  } else {
    Farmer.findOne({ email: email }).then(user => {
      if (user) {
        return res.status(400).send("Email already exists")
      } else {
        const newFarmer = new  Farmer({
          title, address, town, state, fullName, gender, email, phone,  country, farmSize, farmAddress, crops, password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newFarmer .password, salt, (err, hash) => {
            if (err) throw err;
            newFarmer.password = hash;
            newFarmer 
              .save()
              .then(user => {
              //   res.redirect('/users/login');
                res.json(`${user.fullName}, successully registered`)
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
};

// sign-in
const farmerLogin = async (req, res, next) => {
    const name  = req.body.email
    passport.authenticate("local", {
    successRedirect: "/dashboards",
    failureRedirect: "/login"
}),
    res.json(`success, ${name} is successfully Logged in`); 
}


// logout with passport
const farmerLogout = async (req, res) => {
        req.logout();
        // res.redirect('/');
   res.json(`Logged out successfully`);
}

module.exports = {
    farmerLogin,
    farmerApplication,
    getFarmers, 
    farmerLogout
}; 
  