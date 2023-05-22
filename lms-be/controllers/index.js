const {hashPassword,hashCompare,createToken,decodeToken,validate,roleAdmin} = require('../common/auth')
const {LeaveModel} = require('../schema/LeaveSchema')
const { UserModel } = require('../schema/UserSchema')
let handleHome= async(req,res,next)=>{
    res.send(`<h1>Express Home Page! Please visit proper route </h1>`)
}

let handleApplyLeave = async(req,res,next)=>{
    try {
        let data = await LeaveModel.create(req.body)
        res.status(200).send({message:"Leave Request Applied Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Intenal Server error",error})
    }
}

let handleChangeStatus = async(req,res,next)=>{
    try {
        let data = await LeaveModel.updateOne({_id:req.params.id},{$set:{status:`${req.params.toStatus}`}})
        res.status(200).send({message:"Status Updated Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Intenal Server error",error})
    }
}

let handleCancelLeave = async(req,res,next)=>{
    try {
        let data = await LeaveModel.updateOne({_id:req.params.id},{$set:{status:`Cancelled`}})
        res.status(200).send({message:"Status Updated Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Intenal Server error",error})
    }
}

let handleGetLeaveById = async(req,res,next)=>{
    try {
        let leave = await LeaveModel.findOne({_id:req.params.id})
        res.status(200).send(leave)
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Intenal Server error",error})
    }
}

let handleGetLeaveByStatus = async(req,res,next)=>{
    try {
        let leaves = await LeaveModel.find({status:req.params.status})
        res.status(200).send({leaves})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Intenal Server error",error})
    }
}

let handleGetLeavesByUser = async(req,res,next)=>{
    try {
        let user = await UserModel.findOne({_id:req.params.id})
        let leaves = await LeaveModel.find({email:user.email})
        res.status(200).send({leaves})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Intenal Server error",error})
    }
}

module.exports = {handleHome,handleApplyLeave,handleChangeStatus,handleCancelLeave,handleGetLeaveById,handleGetLeaveByStatus,handleGetLeavesByUser}