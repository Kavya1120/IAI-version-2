const mongoose=require('mongoose')

const joblist= mongoose.Schema({
    designation:{
        type:String,
        required:true
    },
    postedby:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        required:true
    },
    startingsalary:{
        type:String,
        required:true
    },
    endingsalary:{
        type:String,
        required:true
    },
    image: {
        type: String,
      },
    date:{
        type:String,
    },
    company:
    {
        type:String
    }
    
})

const job=mongoose.model('joblist',joblist)
module.exports=job
/**/ 
