import mongoose from "mongoose";
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        unique:[true,'name is unique'],
        trim:true,
        required:true,
        minlength:[2,'too short name'],
    },
    slug:{
        type:String,
        lowercase:true,
        required:true,
    },
    image:String
    
    
},{timestamps:true})

export const categoryModel=mongoose.model('category',categorySchema);