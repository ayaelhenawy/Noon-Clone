import mongoose from "mongoose";
const brandSchema=mongoose.Schema({
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
    logo:String
    
    
},{timestamps:true})

export const brandModel=mongoose.model('brand',brandSchema);