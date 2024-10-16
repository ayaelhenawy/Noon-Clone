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
categorySchema.post('init',function(doc){
    doc.image=process.env.BASE_URL+doc.image;
})
export const categoryModel=mongoose.model('category',categorySchema);