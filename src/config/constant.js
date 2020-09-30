const dotEnv = require('dotenv')
const dotEnvFound = dotEnv.config();

if(!dotEnvFound) throw new Error("Could not find dotEnv file")

module.exports = {
    port: process.env.PORT || 2020,
    databaseURI : process.env.MONGODB_URI || "mongodb://localhost/tractive_db", 
    publicKey: process.env.public_key, 
    sessionKey: process.env.SESSIONKEY || 'f3e29360-dd0e-438c-80b8-b33c00ee6d8c'
}
