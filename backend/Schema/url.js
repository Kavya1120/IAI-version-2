const mongoose = require('mongoose');

const urlschema = new mongoose.Schema({
    seq:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }
})

const url = mongoose.model('urls', urlschema);
module.exports = url;
