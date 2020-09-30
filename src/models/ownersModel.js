const   mongoose = require('mongoose')
const Schema = mongoose.Schema


const ownersModel  = new Schema({
    title:{
        type:String, 
        enum: ["Mr.", "Mrs.", "Alh.", "Miss.", "Dr.",  "Prof.", "Chief", "Prince", "Others"],
        trim: true,
        required: [true, "Fullname is required"]
    },

    fullName:{
        type:String, 
        trim: true,
        required: [true, "Fullname is required"]
    },
    username: {
        type:String,
        trim: true
    },
    gender:{
        type:String, 
        enum: ["male", "female", "others"],
        trim: true,
        required: [true, "Gender is required"]
    },
    email:{
        type:String,
        trim: true,
        required: [true, "Email is required"]
    },
    phone: {
        type:String,
        trim: true,
        required: [true, "Phone is required"]
    },
    address: {
        type:String,
        trim: true,
        required: [true, "Address is required"]
    },
    town: {
        type:String,
        trim: true,
        required: [true, "Town is required"]
    },
    state: {
        type:String,
        trim: true,
        required: [true, "State is required"]
    },
    country: {
        type:String,
        trim: true,
        required: [true, "Country is required"]
    },
    role: {
        type:String,
        enum: ["Owner", "Manager", "CEO", "others"],
        trim: true,
        required: [true, "Role is required"]
    },
    firmName: {
        type:String,
        trim: true,
        // required: [true, "Firm name is required"]
    },
    firmAddress: {
        type:String,
        trim: true,
        required: [true, "Firm Address is required"]
    },
    password: {
        type:String,
        trim: true,
        required: [true, "Password is required"]
    }
    
})

module.exports = mongoose.model('owner', ownersModel)