const passport = require("passport"); 
const Agent = require("../models/agentsModel"); 
const bcrypt = require("bcryptjs");

// const jwt       = require("jsonwebtoken"); 

const getAgents = async (req, res, next) => {
    Agent.find()
    .then(data => res.json(data)) 
    .catch(error => res.status(400).json("Error: " + error)); 
};

//   signup 
const agentApplication = async (req, res) => {    

    const {title, address, town, state,  role, fullName, gender, email, phone,  country,  education, employmentStatus, cvLink, password,  } = req.body
    let errors = [];

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    } else {
        Agent.findOne({ email: email }).then(user => {
        if (user) {
          return res.status(400).send("Email already exists")
        } else {
          const newAgent = new Agent({
            title, address, town, state,  role, fullName, gender, email, phone,  country,  education, employmentStatus, cvLink, password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAgent.password, salt, (err, hash) => {
              if (err) throw err;
              newAgent.password = hash;
              newAgent
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
const agentLogin = async (req, res, next) => {
    const name  = req.body.email
    passport.authenticate("local", {
    successRedirect: "/fleets",
    failureRedirect: "/login"
}),
    res.json(`success, ${name} is successfully Logged in`); 
}

// logout
const agentLogout = async (req, res) => {
        req.logout();
        // res.redirect('/');
   res.json(`Logged out successfully`);
}



module.exports = {
    agentLogin,
    agentApplication,
    getAgents, 
    agentLogout
}; 
  