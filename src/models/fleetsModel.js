const mongoose = require('mongoose')

const Schema = mongoose.Schema


const fleetsModel  = new Schema({
    name:{
        type:String, 
        trim: true,
        required: [true, "Fullname is required"]
    },
    description:{
        type:String, 
        trim: true,
        required: [true, "Gender is required"]
    },
    
    purpose: {
        type:String,
        trim: true,
        required: [true, "Phone is required"]
    },
    image:{
        type:String,
        trim: true,
        required: [true, "Email is required"]
    },
    availability: {
        type:String,
        enum: ["Currently available", "One week time", "Two weeks - Four weeks time ", "Currently unavailable"],
        trim: true,
        required: [true, "Crops grown is required"]
    }
    
})

module.exports = mongoose.model('fleet', fleetsModel)