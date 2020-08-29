const express = require("express");
const app = express();
// const http = require("http");
const userUrl = require("./src/routes/routes");
// const server = http.createServer(app)

const config = require("./src/config/constant");
const database = require("./src/config/database");


const port  = config.port

app.listen(port, () => {
    database()
    console.log(`Server listening on port ${port}`)
})


app.use(express.json()); 
app.use("/users", userUrl);

 

app.on('error', error => {
    console.log(`Error occured on the server ${error}`)
})