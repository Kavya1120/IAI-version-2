const mongoose = require('mongoose');

const profileschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 3,
        maxlength: 25
    },
    bio:{
        type:String,
        required:true,
        minlength: 10,
        maxlength: 100
    },
    about:{
        type:String,
        required:true,
        minlength: 100,
        maxlength: 1000
    },
    experience:{
        type:String,
        required:true,
        minlength: 100,
        maxlength: 2000
    },
    education:{
        type:String,
        required:true
        
    },
    skills:{
        type:[String],
        required:true
    },
    languages:{
        type:[String],
        required:true
    }
})

const domain = mongoose.model('profiledetails', profileschema);
module.exports = domain;
