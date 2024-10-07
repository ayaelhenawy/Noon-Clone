import mongoose from "mongoose";
const couponSchema=mongoose.Schema({
    code:{
        type:String,
        trim:true,
        required:true,
    },
    expire:Date,
    discount:{
        type:Number,
        required:true,
    }
    
    
},{timestamps:true})

export const couponModel=mongoose.model('coupon',couponSchema);