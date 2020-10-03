const passport = require("passport")
const crypto = require('crypto');
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwtConfig"); 
const Owner = require("../models/ownersModel");

require('dotenv').config();
const nodemailer = require('nodemailer');
const BCRYPT_SALT_ROUNDS = 12;


const getOwners = async (req, res, next) => {
    Owner.find()
    .then(data => res.json(data)) 
    .catch(error => res.status(400).json("Error: " + error)); 
};

// register 
const ownerApplication = async (req, res, next) => { 
    passport.authenticate('registerOwner', (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        req.logIn(user, error => {

          console.log("owners");
          console.log(user);

          const { title, address, town, state,  role, fullName, gender, email, phone,  country, firmName, firmAddress,  } = req.body

          const data = {
            title, address, town, state, role, fullName, gender, email, phone,  country, firmName, firmAddress, 
            email: user.email,
          };
          console.log("data");
          console.log(data);
          Owner.findOne({
              email: data.email
          }).then(user => {
            console.log(user);
            // const {  title, address, town, state,  role, fullName, gender, email, phone,  country, firmAddress, password,  } = data
            user
              .update({
                title: data.title, 
                address: data.address, 
                town: data.town, 
                state: data.state, 
                fullName: data.fullName, 
                gender: data.gender, 
                email: data.email, 
                phone: data.phone,  
                country: data.country, 
                role: data.role, 
                firmName: data.firmName,
                firmAddress: data.firmAddress,
              })
              .then(() => {
                console.log('user created in db');
                res.status(200).send({ message: `${data.fullName}, successully registered`});
              });
          });
        });
      }
    })(req, res, next);
};

// sign-in
const ownerLogin = async (req, res, next) => {
      passport.authenticate('loginOwner', (err, users, info) => {
        if (err) {
          console.error(`error ${err}`);
        }
        if (info !== undefined) {
          console.error(info.message);
          if (info.message === 'Incorrect Email') {
            res.status(401).send(info.message);
          } else {
            res.status(403).send(info.message);
          }
        } else {
          req.logIn(users, () => {
            Owner.findOne({
                email: req.body.email,
            }).then(user => {
              const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
                expiresIn: 60 * 60,
              });
              res.status(200).send({
                auth: true,
                token,
                message: 'user found & logged in',
              });
            });
          });
        }
      })(req, res, next);
  };
  
  // find user
const findUser = async (req, res, next) => {
  passport.authenticate('jwtOwner', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message);
    } else if (user.email === req.query.email) {
     Owner.findOne({
          email: req.query.email,
      }).then((userInfo) => {
        if (userInfo != null) {
          console.log('user found in db from findUsers');
          const { title, address, town, state,  role, fullName, gender, email, phone,  country, firmName, firmAddress, password, } = userInfo
          res.status(200).send({
            auth: true,
            title, address, town, state,  role, fullName, gender, email, phone,  country, firmName, firmAddress, password, 
            message: 'user found!',
          });
        } else {
          console.error('no user exists with that email');
          res.status(401).send('no user exists with that email');
        }
      });
    } else {
      console.error('jwt id and email do not match');
      res.status(403).send('email and jwt token do not match');
    }
  })(req, res, next);
};

  // forgot password
  const forgotPassword = async (req, res, next) => {
      if (req.body.email === '') {
        res.status(400).send('email required');
      }
      console.error(req.body.email);
      Owner.findOne({
          email: req.body.email,
      }).then((user) => {
        if (user === null) {
          console.error('email not found!');
          res.status(403).send('email not found');
        } else {
          const token = crypto.randomBytes(20).toString('hex');
          Owner.update({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000,
          });
  
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `${process.env.EMAIL_ADDRESS}`,
              pass: `${process.env.EMAIL_PASSWORD}`,
            },
          });
  
          const mailOptions = {
            from: 'olabrazanislam@gmail.com',
            to: `${user.email}`,
            subject: 'Link To Reset Password',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
              + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
              + `http://localhost:2020/reset/${token}\n\n`
              + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          };
  
          console.log('sending mail');
  
          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.error('there was an error: ', err);
            } else {
              console.log('here is the res: ', response);
              res.status(200).json('recovery email sent');
            }
          });
        }
      });
  };
  
  // reset password
  const resetPassword = async (req, res, next) => {
      Owner.findOne({
        where: {
          resetPasswordToken: req.query.resetPasswordToken,
          resetPasswordExpires: Date.now(),
        },
      }).then((user) => {
        if (user == null) {
          console.error('password reset link is invalid or has expired');
          res.status(403).send('password reset link is invalid or has expired');
        } else {
          res.status(200).send({
            email: user.email,
            message: 'password reset link sent!',
          });
        }
      });
  };

 
  // update password
  const updatePassword = async (req, res, next) => {
      passport.authenticate('jwtOwner', { session: false }, (err, user, info) => {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
        } else {
         Owner.findOne({
              email: req.body.email,
          }).then((userInfo) => {
            if (userInfo != null) {
              console.log('user found!');
              bcrypt
                .hash(req.body.password, BCRYPT_SALT_ROUNDS)
                .then((hashedPassword) => {
                  userInfo.update({
                    password: hashedPassword,
                  });
                })
                .then(() => {
                  console.log('password updated');
                  res
                    .status(200)
                    .send({ auth: true, message: 'password updated' });
                });
            } else {
              console.error('no user exists in db to update');
              res.status(404).json('no user exists in db to update');
            }
          });
        }
      })(req, res, next);
  };

  // update password via Email
  const updatePasswordViaEmail = async (req, res, next) => {
      Owner.findOne({
        where: {
          email: req.body.email,
          resetPasswordToken: req.body.resetPasswordToken,
          resetPasswordExpires:  Date.now(),
        },
      }).then(user => {
        if (user == null) {
          console.error('password reset link is invalid or has expired');
          res.status(403).send('password reset link is invalid or has expired');
        } else if (user != null) {
          console.log('user exists! ');
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then(hashedPassword => {
              user.update({
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
              });
            })
            .then(() => {
              console.log('password updated');
              res.status(200).send({ message: 'password updated' });
            });
        } else {
          console.error('no user exists in db to update');
          res.status(401).json('no user exists in db to update');
        }
      });
  };


  // delete user
  const deleteUser = async (req, res, next) => {
      passport.authenticate('jwtOwner', { session: false }, (err, user, info) => {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
        } else {
          Owner.destroy({
              email: req.query.email,
          })
            .then((userInfo) => {
              if (userInfo === 1) {
                console.log('user deleted from db');
                res.status(200).send('user deleted!');
              } else {
                console.error('user not found in db');
                res.status(404).send('no user with that email to delete');
              }
            })
            .catch((error) => {
              console.error('problem communicating with db');
              res.status(500).send(error);
            });
        }
      })(req, res, next);
  };
  
// update user
  const updateUser = async (req, res, next) => {
      passport.authenticate('jwtOwner', { session: false }, (err, user, info) => {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
        } else {
          Farmer.findOne({
              email: req.body.email,
          }).then((userInfo) => {
            if (userInfo != null) {
              console.log('user found in db');
              const { title, address, town, state,  role, fullName, gender, email, phone,  country, firmName, firmAddress, password,  } = req.body
              userInfo
                .update({
                    title, address, town, state,  role, fullName, gender, email, phone,  country, firmName, firmAddress, password, 
                })
                .then(() => {
                  console.log('user updated');
                  res.status(200).send({ auth: true, message: 'user updated' });
                });
            } else {
              console.error('no user exists in db to update');
              res.status(401).send('no user exists to update');
            }
          });
        }
      })(req, res, next);
   
  };
  


module.exports = {
    ownerLogin,
    ownerApplication,
    forgotPassword,
    resetPassword,
    updatePassword,
    updatePasswordViaEmail,
    getOwners, 
    findUser,
    deleteUser,
    updateUser
}; 
  