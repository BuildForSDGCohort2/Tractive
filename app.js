const express = require('express');
const ejs = require("ejs"); 
const app = express();
const homeRouter = require("./routes/index")

app.use('/', homeRouter);
// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');

// app.get("/", (req, res) => {
//     res.render("index")
//     })

module.exports = app;