import slugify from "slugify";

import { catchError } from "../../middleware/catchGlobalError.js";
import { subCategoryModel } from "../../../DataBase/models/subCategory.model.js";


const addsubCategory=async(req,res)=>{
    req.body.slug=slugify(req.body.name)
    let subCategory=new subCategoryModel(req.body);
    console.log(subCategory);
    await subCategory.save()
    res.json({message:"success",subCategory})
}

const allsubCategory=catchError(async(req,res)=>{
    let subCcategories=await subCategoryModel.find();
    res.json({message:"success",subCategories})
})

const getsubCategory=catchError(
    async(req,res)=>{
        let subCategory=await subCategoryModel.findById(req.params.id);
        res.json({message:"success",subCategory})
    }
)


const updatesubCategory=catchError(
    async(req,res)=>{
        req.body.slug=slugify(req.body.name)
        let subCategory=await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json({message:"success",subCategory})
    }
)
const deletesubCategory=catchError(
    async(req,res)=>{
        let subCategory=await subCategoryModel.findByIdAndDelete(req.params.id);
        res.json({message:"success",subCategory})
    }
)


export{
    addsubCategory,allsubCategory,getsubCategory,updatesubCategory,deletesubCategory
}