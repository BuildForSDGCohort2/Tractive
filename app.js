const path = require('path');
const express = require("express");
const passport = require("passport"); 
const flash = require('express-flash');
const session = require('express-session');
const cors = require("cors"); 
const morgan = require('morgan');
// const dotenv = require("dotenv"); 

const app = express();

// Passport Config
// require("./src/config/passport")(passport);
require("./src/config/agentPassport");
require("./src/config/ownerPassport");
require("./src/config/passports");

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


// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express public
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static('client/build'));
  app.use(express.static(path.join(__dirname, "client", "build")))

  app.get('*',(req, res) => {
      res.sendFile(path.join(__dirname,'client','build','index.html'));
  })
}

// cors
// app.use(cors()); 

app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );

//   app.use('/', (req, res)=> {
//     res.status(200).sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
// })


// routes
app.use("/farmers", farmerUrl);
app.use("/fleets", fleetUrl);
app.use("/contact-us", contactUrl);
app.use("/owners", ownerUrl);
app.use("/agents", agentUrl);
app.use(morgan('tiny'));


const port  = config.port
app.listen(port, () => {
    database()
    console.log(`Server listening on port ${port}`)
})


app.on('error', error => {
    console.log(`Error occured on the server ${error}`)
})