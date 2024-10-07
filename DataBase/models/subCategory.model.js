import mongoose from "mongoose";
const subCategorySchema=mongoose.Schema({
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
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    }
    
    
},{timestamps:true})

export const subCategoryModel=mongoose.model('subCategory',subCategorySchema);