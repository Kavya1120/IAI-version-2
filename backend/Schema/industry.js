const mongoose = require('mongoose')

const industrySchema = new mongoose.Schema({
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
    companyname:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    chamber:{
        type:String,
        required:true
    },bio:{
        type:String,
    },
    about:{
        type:String,
    },
    experience:[{ 
        companyName: String,
        jobRole: String,
        jobType: String,
        fromDate: String,
        toDate: String,
        experience: String
      }],
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
//for student

const industry = new mongoose.model('industries', industrySchema)
module.exports = industry