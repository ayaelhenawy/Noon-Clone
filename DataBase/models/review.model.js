import mongoose from "mongoose";
const reviewSchema=mongoose.Schema({
    text:{
        type:String,
        trim:true,
        minlength:[10,'too short name'],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    },
    rate:{
        type:Number,
        min:0,
        max:5,
    },
    
    
},{timestamps:true})

export const reviewModel=mongoose.model('review',reviewSchema);