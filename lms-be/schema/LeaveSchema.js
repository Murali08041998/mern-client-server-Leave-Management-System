const mongoose = require('mongoose')
const validator = require('validator')
const leaveSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{
            type:String,
            required:true,
            validate:(value)=>validator.isEmail(value)
        },
    mobile:{
            type:String,
            required:true,
            validate:(value)=>validator.isNumeric(value) && value.length===10
        },
    fromDate:{type:Date,required:true},
    toDate:{type:Date,required:true},
    noofdays:{type:Number},
    type:{type:String,required:true},
    reason:{type:String,required:true},
    status:{type:String,default:'Pending'},
    createdAt:{type:Date,default:Date.now()}
},
{
    collection:'leaves',
    versionKey:false
})
const LeaveModel = mongoose.model('leaves',leaveSchema)
module.exports={LeaveModel}