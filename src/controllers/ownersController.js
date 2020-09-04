const bcrypt = require("bcryptjs");
const passport = require('passport');

// const Owner = require("../models/ownersModel"); 
const Owner = require("../models/ownersModel")


const getOwners = async (req, res, next) => {
    Owner.find()
    .then(data => res.json(data)) 
    .catch(error => res.status(400).json("Error: " + error)); 
};

//   signup 
const ownerApplication =  async  (req, res) => {    

const { title, address, town, state,  role, fullName, gender, email, phone,  country, firmAddress,  password, password2 } = req.body;
  let errors = [];

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  } else {
    Owner.findOne({ email: email }).then(user => {
      if (user) {
        return res.status(400).send("Email already exists")
      } else {
        const newOwner= new Owner({
          title, address, town, state,  role, fullName, gender, email, phone,  country, firmAddress, password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newOwner.password, salt, (err, hash) => {
            if (err) throw err;
            newOwner.password = hash;
            newOwner
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
}

// signin with passport 
const ownerLogin = (req, res, next) => {
    const name  = req.body.email
    passport.authenticate("local", {
    successRedirect: "/fleets",
    failureRedirect: "/login"
}),
    res.json(`success, ${name} is successfully Logged in`); 
}


// logout with passport
const ownerLogout =  (req, res) => {
        req.logout();
        // res.redirect('/');
   res.json(`Logged out successfully`);
}


module.exports = {
    ownerLogin,
    ownerApplication,
    getOwners, 
    ownerLogout
}