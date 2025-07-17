import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'


import { catchError } from "../../middleware/catchGlobalError.js"
import { AppError } from "../../utilts/appError.js"
import { userModel } from "../../../DataBase/models/user.model.js"



const signup =catchError(async(req,res,next)=>{
    let user = new userModel(req.body)
    await user.save()
    let token = jwt.sign({userId:user._id,email:user.email},'aykey')
    res.json({message:"success",token})
    
})


const signin =catchError(async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user&&bcrypt.compareSync(req.body.password,user.password)){
        let token = jwt.sign({userId:user._id,email:user.email},'aykey')
        return res.json({message:"success",token})
    }
    next(new AppError("incorrect mail or password",401))
})


const changeUserPassword =catchError(async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})

    if(user&&bcrypt.compareSync(req.body.oldPassword,user.password)){
        
        await userModel.findOneAndUpdate({email:req.body.email},{password:req.body.newPassword})
        let token = jwt.sign({userId:user._id,email:user.email},'aykey')
       
        return res.json({message:"success",token})
        
    }

    next(new AppError("incorrect mail or password",401))
})

export{
    signup,
    signin,
    changeUserPassword 
}