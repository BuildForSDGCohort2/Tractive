    
const bcrypt = require("bcrypt");
const jwtSecret = require("./jwtConfig"); 

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Agent = require("../models/agentsModel"); 
  
 
  // agent 
  passport.use(
    'registerAgent',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false,
      },
      (req, email, password, done) => {
        console.log(email);
        console.log(req.body.email);
  
        try {
          Agent.findOne({
                email: email
          }).then(user => {
            if (user != null) {
              console.log('email already taken');
              return done(null, false, {
                message: 'email already taken',
              });
            }
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                const { title, address, town, state, fullName, gender, email, phone,  country,  education, employmentStatus, cvLink, image, password  } = req.body
              Agent.create({
                email, title, address, town, state, fullName, gender, phone,  country,  education, employmentStatus, cvLink, image,
                password: hashedPassword,
                email: req.body.email,
              }).then(user => {
                console.log('user created');
                return done(null, user);
              });
            });
          });
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
  
  passport.use(
    'loginAgent',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
      (email, password, done) => {
        try {
          Agent.findOne({
              email,
          }).then(user => {
            if (user === null) {
              return done(null, false, { message: 'Incorrect Email' });
            }
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log('passwords do not match');
                return done(null, false, { message: 'passwords do not match' });
              }
              console.log('user found & authenticated');
              return done(null, user);
            });
          });
        } catch (err) {
          done(err);
        }
      },
    ),
  );
  
  
  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
  };
  
  passport.use(
    'jwtAgent',
    new JWTstrategy(opts, (jwt_payload, done) => {
      try {
        Agent.findById(
            jwt_payload.id
        ).then(user => {
          if (user) {
            console.log('user found!');
            done(null, user);
          } else {
            console.log('user not found');
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    }),
  );
  