const mongoose = require('mongoose')
const otp = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    }
}) 

const Otp = new mongoose.model("otp",otp)
module.exports=Otp;

