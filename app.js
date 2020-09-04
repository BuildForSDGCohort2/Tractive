const path = require('path');
const express = require("express");
const passport = require("passport"); 
const flash = require('express-flash');
const session = require('express-session');
const cors = require("cors"); 

const app = express();

// Passport Config
require("./src/config/passport")(passport);

// routes URL
const farmerUrl = require("./src/routes/farmerRoute");
const fleetUrl = require("./src/routes/fleetRoute");
const contactUrl = require("./src/routes/contactRoute");
const agentUrl = require("./src/routes/agentRoute");
const ownerUrl = require("./src/routes/ownerRoute");

// db config and constants
const config = require("./src/config/constant");
const database = require("./src/config/database");
const { sessionKey } = require('./src/config/constant');

// Express session
app.use(session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true
  }));

  // Connect flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// EJS
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express public
app.use(express.static(path.join(__dirname, 'public')));


// cors
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );

// routes
app.use("/farmers", farmerUrl);
app.use("/fleets", fleetUrl);
app.use("/contacts", contactUrl);
app.use("/owners", ownerUrl);
app.use("/agents", agentUrl);



const port  = config.port
app.listen(port, () => {
    database()
    console.log(`Server listening on port ${port}`)
})

// app.listen('2020' || process.env.PORT, err => { 
//     database()
//     if (err) 
//         throw err 
//     console.log('Server started now') 
// }) 

app.on('error', error => {
    console.log(`Error occured on the server ${error}`)
})