import slugify from "slugify";
import { categoryModel } from "../../../DataBase/models/category.model.js"


const addCategory=async(req,res)=>{
    req.body.slug=slugify(req.body.name)
    let category=new categoryModel(req.body);
    console.log(category);
    await category.save()
    res.json({message:"success",category})
}

const allCategory=async(req,res)=>{
    let categories=await categoryModel.find();
    res.json({message:"success",categories})
}

const getCategory=async(req,res)=>{
    let category=await categoryModel.findById(req.params.id);
    res.json({message:"success",category})
}


const updateCategory=async(req,res)=>{
    
    let category=await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json({message:"success",category})
}
const deleteCategory=async(req,res)=>{
    let category=await categoryModel.findByIdAndDelete(req.params.id);
    res.json({message:"success",category})
}

export{
    addCategory,allCategory,getCategory,updateCategory,deleteCategory
}