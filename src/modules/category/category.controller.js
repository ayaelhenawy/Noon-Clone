import slugify from "slugify";
import { categoryModel } from "../../../DataBase/models/category.model.js"
import { catchError } from "../../middleware/catchGlobalError.js";
import { ApiFeature } from "../../utilts/apiFeature.js";


const addCategory=async(req,res)=>{
    req.body.slug=slugify(req.body.name)
    req.body.image=req.file.filename;
    let category=new categoryModel(req.body);
    console.log(category);
    await category.save();
    res.json({message:"success"})
}

const allCategory=catchError(async(req,res)=>{
    let apiFeature=new ApiFeature(categoryModel.find(),req.query)

    let category=await apiFeature.mongooseQuery;
    res.json({message:"success",page:apiFeature.pageNumber,category})
    
})

const getCategory=catchError(
    async(req,res)=>{
        let category=await categoryModel.findById(req.params.id);
        res.json({message:"success",category})
    }
)


const updateCategory=catchError(
    async(req,res)=>{
        req.body.slug=slugify(req.body.name)
        req.body.image=req.file.filename;
        let category=await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json({message:"success",category})
    }
)
const deleteCategory=catchError(
    async(req,res)=>{
        let category=await categoryModel.findByIdAndDelete(req.params.id);
        res.json({message:"success",category})
    }
)


export{
    addCategory,allCategory,getCategory,updateCategory,deleteCategory
}