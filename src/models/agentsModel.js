const mongoose = require('mongoose')

const Schema = mongoose.Schema


const agentsModel  = new Schema({
    title:{
        type:String, 
        enum: ["Mr.", "Mrs.", "Miss.", "Dr.", "Prof.", "Chief", "Prince", "Others"],
        trim: true,
        required: [true, "Fullname is required"]
    },
    fullName:{
        type:String, 
        trim: true,
        required: [true, "Fullname is required"]
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
    education: {
        type:String,
        enum: ["O/Level", "diploma", "degree", "masters", "Ph.d", "others" ],
        trim: true,
        required: [true, "Role is required"]
    },
    employmentStatus: {
        type: String,
        enum: ['employed', 'unemployed', 'student'],
        default: 'unemployed'
      },

    cvLink: {
        type: String,
        required: true,
        default: 'blank'
      },
   
    password: {
        type:String,
        trim: true,
        required: [true, "Password is required"]
    }
    
})


module.exports = mongoose.model('agent', agentsModel)