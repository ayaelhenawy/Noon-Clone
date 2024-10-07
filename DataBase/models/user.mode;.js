import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:[2,'too short name'],
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    isActive:{
        type:boolean,
        default:true,
    },
    isBlocked:{
        type:boolean,
        default:false,
    },
    confirmEmail:{
        type:boolean,
        default:false,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }

    
    
    
},{timestamps:true})

export const userModel=mongoose.model('user',userSchema);