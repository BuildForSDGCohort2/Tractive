const express = require("express");
const app = express();

const path = require('path');
var bodyParser = require('body-parser'); 
const userUrl = require("./src/routes/userRoute");
const fleetUrl = require("./src/routes/fleetRoute");
const contactUrl = require("./src/routes/contactRoute");
const agentUrl = require("./src/routes/agentRoute");
const ownerUrl = require("./src/routes/ownerRoute");

const session = require('express-session');
const flash = require('express-flash');
const { sessionKey } = require('./src/config/constant');
// const server = http.createServer(app)


const config = require("./src/config/constant");
const database = require("./src/config/database");


const port  = config.port

app.listen(port, () => {
    database()
    console.log(`Server listening on port ${port}`)
})

app.use(session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true
  }));

app.use(flash());



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


// routes
app.use("/users", userUrl);
app.use("/fleets", fleetUrl);
app.use("/contacts", contactUrl);
app.use("/owners", ownerUrl);
app.use("/agents", agentUrl);

app.listen('2020' || process.env.PORT, err => { 
    if (err) 
        throw err 
    console.log('Server started now') 
}) 

app.on('error', error => {
    console.log(`Error occured on the server ${error}`)
})