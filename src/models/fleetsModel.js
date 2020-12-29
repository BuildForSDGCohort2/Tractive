const mongoose = require('mongoose')

const Schema = mongoose.Schema


const fleetsModel  = new Schema({
    name:{
        type:String, 
        trim: true,
        required: [true, "Name is required"]
    },
    desc:{
        type:String, 
        trim: true,
        required: [true, "Description is required"]
    },
    
    purpose: {
        type:String,
        trim: true,
        required: [true, "Purpose is required"]
    },
    ownerNumber:{
        type: String,
        trim: true,
        required: [true, "Number is required"]
    },
    ownerEmail:{
        type: String,
        trim: true,
        required: [true, "Email is required"]
        
    },
    ownerContact:{
        type: String,
        trim: true,
        required: [true, "Contact is required"]
    },
    chargePerAcre:{
        type:String,
        trim: true
    },
    image:{
        type:String
    },

    availability: {
        type:String,
        enum: ["Currently available", "One week time", "Two weeks - Four weeks time ", "Currently unavailable"],
        trim: true
    } 
    }, {
        timestamps: true
    
})

module.exports = mongoose.model('fleet', fleetsModel)