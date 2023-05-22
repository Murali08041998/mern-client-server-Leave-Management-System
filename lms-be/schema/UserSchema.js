const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
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
    password:{type:String,required:true},
    role:{type:String,default:"employee"},
    createdAt:{type:Date,default:Date.now()}
},
{
    collection:'userlms',
    versionKey:false
})
const UserModel = mongoose.model('userlms',userSchema)
module.exports={UserModel}