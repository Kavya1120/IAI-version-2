const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ashwinkaranthamalai:Ashwin17@cluster0.qm1hj66.mongodb.net/IAI').then(()=>{
    console.log('DB connection succesfull')
}).catch((e)=>{
    console.log('error occured', e)
})