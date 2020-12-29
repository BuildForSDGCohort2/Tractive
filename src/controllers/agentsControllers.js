const passport = require("passport")
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const config = require("../config/constant")
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwtConfig"); 
const Agent = require("../models/agentsModel");

require('dotenv').config();
const nodemailer = require('nodemailer');
const BCRYPT_SALT_ROUNDS = 12;


const getAgents = async (req, res, next) => {
    Agent.find()
    .then(data => {
      jwt.verify(req.token, jwtSecret.secret, data, (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the agents route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            res.json({
                data,
            });
            console.log('SUCCESS: Connected to agents');
        }
    })
    }); 
};

// register 
const agentApplication = async (req, res, next) => { 
    passport.authenticate('registerAgent', (err, user, info) => {
      if (err) {
        res.status(403).json({err: "Error! Please try again or check you inputs"});
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        req.logIn(user, error => {

          console.log("agents");
          console.log(user);

          const { title, address, town, state, fullName, gender, email, phone,  country,  education, employmentStatus, cvLink, password, image, } = req.body

          let data = {
            title, address, town, state, fullName, gender, email, phone,  country,  education, employmentStatus, cvLink, password, image,
            email: user.email,
          };
          console.log("data");
          console.log(data);
          Agent.findOne({
              email: data.email
          }).then(user => {
            console.log(user);
            // const {  title, address, town, state,  role, fullName, gender, email, phone,  country,  education, employmentStatus, cvLink, password  } = data
            user
              .update({
                // last_name: req.body.last_name,
                title: data.title, 
                address: data.address, 
                town: data.town, 
                state: data.state,  
                fullName: data.fullName, 
                gender: data.gender, 
                email: data.email, 
                phone: data.phone,  
                country: data.country,  
                education: data.education, 
                employmentStatus: data.employmentStatus, 
                cvLink: data.cvLink,
                image: data.image,
              })
              .then(() => {
                console.log('user created in db');
                res.status(200).json({ message: `Dear ${title} ${user.fullName}, You are successully registered, Thanks`});
              });
          });
        });
      }
    })(req, res, next);
};

// sign-in
const agentLogin = async (req, res, next) => {
      passport.authenticate('loginAgent', (err, users, info) => {
        if (err) {
          console.error(`error ${err}`);
          res.status(401).json({err: "error login In"})
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
            Agent.findOne({
                email: req.body.email,
            }).then(user => {
              const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
                expiresIn: '1h' 
              });
              const {id, title, fullName, email, image} = user
              res.status(200).json({
                auth: true,
                token,
                user:{id, title, fullName, email, image },
                message: `You are successfully logged in`,
              });
            });
          });
        }
      })(req, res, next);
  };
  
  // find user
const findUser = async (req, res, next) => {
  passport.authenticate('jwtAgent', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message);
    } else if (user.email === req.query.email) {
        Agent.findOne({
          email: req.query.email,
      }).then((userInfo) => {
        if (userInfo != null) {
          console.log('user found in db from findUsers');
          const { title, address, town, state, fullName, gender, email, phone,  country,  education, employmentStatus, cvLink, password, image,} = userInfo
          res.status(200).send({
            auth: true,
            title, address, town, state, fullName, gender, email, phone,  country,  education, employmentStatus, cvLink, password, image,
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
      Agent.findOne({
          email: req.body.email,
      }).then((user) => {
        if (user === null) {
          console.error('email not found!');
          res.status(403).send('email not found');
        } else {
          const token = crypto.randomBytes(20).toString('hex');
          Agent.update({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000,
          });
  
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              // user: `${process.env.EMAIL_ADDRESS}`,
              // user: `${config.email}`,
              user: config.email,
              // pass: `${process.env.EMAIL_PASSWORD}`,
              // pass: `${config.password}`,
              pass: config.password,
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
    Agent.findOne({
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
      passport.authenticate('jwtAgent', { session: false }, (err, user, info) => {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
        } else {
            Agent.findOne({
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
    Agent.findOne({
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
      passport.authenticate('jwtAgent', { session: false }, (err, user, info) => {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
        } else {
            Agent.destroy({
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
      passport.authenticate('jwtAgent', { session: false }, (err, user, info) => {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
        } else {
            Agent.findOne({
              email: req.body.email,
          }).then((userInfo) => {
            if (userInfo != null) {
              console.log('user found in db');
              const { title, address, town, state,  role, fullName, gender, email, phone,  country, firmAddress, password, image, } = req.body
              userInfo
                .update({
                    title, address, town, state,  role, fullName, gender, email, phone,  country, firmAddress, password, image,
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
    agentLogin,
    agentApplication,
    forgotPassword,
    resetPassword,
    updatePassword,
    updatePasswordViaEmail,
    getAgents, 
    findUser,
    deleteUser,
    updateUser
}; 
  
