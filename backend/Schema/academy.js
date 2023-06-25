const mongoose = require('mongoose')

const academySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    affiliation:{
        type:String,
        required:true
    },
    university:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        require:true
    },
    position:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    bio:{
        type:String,
    },
    about:{
        type:String,
    },
    education:[{
        university: String,
        degree: String,
        department: String,
        fromYear: String,
        toYear: String
      }],
    skills:{
        type:[String]
    },
    languages:{
        type:[String]
    },
    resume:{
        type:Buffer,
        contentType:String
    },
    detailsprovided:{
        type:Boolean,
        default:false
    }
})


const academy = new mongoose.model('academies', academySchema)
module.exports = academy