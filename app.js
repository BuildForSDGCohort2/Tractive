const path = require('path');
const express = require("express");
const passport = require("passport"); 
const flash = require('express-flash');
const session = require('express-session');
const cors = require("cors"); 
const morgan = require('morgan');
const mongoose = require('mongoose')
// const dotenv = require("dotenv"); 

const app = express();

const PORT = process.env.PORT || 2020 
const dbURL = process.env.NODE_ENV==='production' ? process.env.MONGODB_URI : 'mongodb://localhost/tractive_db'
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); 

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
// const config = require("./src/config/constant");
// const database = require("./src/config/database");
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express public
app.use(express.static(path.join(__dirname, 'public')));

// production error (fetching data from database) is due to build 
// i have spent more than 1 week debugging it
// coming back to make it work properly InsaAllah



// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   // app.use(express.static(path.join(__dirname, "client", "build")))

//   app.get('*',(req, res) => {
//       res.sendFile(path.join(__dirname,'client','build','index.html'));
//   })
// }

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "index.html"));
  });
}

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build', "index.html"));
// }

// cors
app.use(cors()); 


// app.use(
//     cors({
//       origin: "http://localhost:3000", // <-- location of the react app were connecting to
//       credentials: true,
//     })
//   );

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


// const PORT  = config.port
app.listen(PORT, () => {
    // database()
    console.log(`Server listening on port ${PORT}`)
})

mongoose.connection.on("connected", () => {
  console.log("Database Connected!!!"); 
}); 

app.on('error', error => {
    console.log(`Error occured on the server ${error}`)
})