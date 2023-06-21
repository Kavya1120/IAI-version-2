const mongoose = require('mongoose');

const newschema = new mongoose.Schema({
    seq:{
        type:Number,
        required:true
    },
    newsfeedurl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }
})

const news = mongoose.model('news', newschema);
module.exports = news;
