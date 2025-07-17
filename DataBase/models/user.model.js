import mongoose from "mongoose";

import bcrypt from 'bcrypt'
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

userSchema.pre('save',function(){
    this.password= bcrypt.hashSync(this.password,8)
    console.log(this);
})

userSchema.pre('findOneAndUpdate',function(){
    if(this._update.password) this._update.password= bcrypt.hashSync(this._update.password,8)
    console.log(this);
})


export const userModel=mongoose.model('user',userSchema);