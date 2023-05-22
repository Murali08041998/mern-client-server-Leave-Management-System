const {UserModel} = require('../schema/UserSchema')
const auth = require('../common/auth')
const handleLogin = async(req,res,next)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email})
        if(user)
        {
            if(await auth.hashCompare(req.body.password, user.password))
            {
              let token = await auth.createToken(
                {
                  firstName:user.firstName,
                  lastName:user.lastName,
                  email:user.email,
                  mobile:user.mobile,
                  role:user.role
                })
              res.status(200).send({message:"Login Succesfull!",token,userid:user._id,role:user.role})
            }
            else
            {
              res.status(400).send({message:`Invalid Credential`})
            }
        }
        else
        {
          res.status(400).send({message:`User with ${req.body.email} does not exists`})  
        }
      } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error",error})
      }
}

const handleSignup = async(req,res,next)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email})
        if(!user)
        {
            req.body.password = await auth.hashPassword(req.body.password) 
            let user = await UserModel.create(req.body)
            res.status(201).send({message:"Registration Succesfull!"})
        }
        else
        {
          res.status(400).send({message:`User with ${req.body.email} already exists`})  
        }
      } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error",error})
      }
}

const handleGetUserDetails = async(req,res,next)=>{
  try {
    let user = await UserModel.findOne({_id:req.params.id},{_id:0,password:0,createdAt:0,role:0})
    res.status(200).send({message:"Date Fetched Successfully",user})
  } catch (error) {
    console.log(error)
        res.status(500).send({message:"Internal Server Error",error})
  }
}

module.exports = {handleLogin,handleSignup,handleGetUserDetails}