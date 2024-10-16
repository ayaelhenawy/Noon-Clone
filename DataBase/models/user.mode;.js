import mongoose from "mongoose";

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
        type:Boolean,
        default:true,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }

    
    
    
},{timestamps:true})

export const userModel=mongoose.model('user',userSchema);