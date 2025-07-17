
import { brandModel } from "../../DataBase/models/brand.model.js";
import { categoryModel } from "../../DataBase/models/category.model.js";
import { productModel } from "../../DataBase/models/product.model.js";

import { subCategoryModel } from "../../DataBase/models/subCategory.model.js";
import { userModel } from "../../DataBase/models/user.model.js";
import { AppError } from "../utilts/appError.js";

const checkCategoryExistOrNot=async(req,res,next)=>{
    let category=await categoryModel.findById(req.params.id);
    if(category)next();
    else {
        next(new AppError(`this category nof found  ${req.originalUrl}`,404))
    }



}


const checkEmail= async(req,res,next)=>{
    
    let isExist = await userModel.findOne({email:req.body.email})
    if(isExist) return next(new AppError("email already exists.",409))
    next()
}
const checkSubCategoryExistOrNot=async(req,res,next)=>{
    let subCategory=await subCategoryModel.findById(req.params.id);
    if(subCategory)next();
    else {
        next(new AppError(`this subCategory nof found  ${req.originalUrl}`,404))
    }


}

const checkBrandExistOrNot=async(req,res,next)=>{
    let brand=await brandModel.findById(req.params.id);
    if(brand)next();
    else {
        next(new AppError(`this Brand nof found  ${req.originalUrl}`,404))
    }


}

const checkProductExistOrNot=async(req,res,next)=>{
    let brand=await productModel.findById(req.params.id);
    if(brand)next();
    else {
        next(new AppError(`this Brand nof found  ${req.originalUrl}`,404))
    }


}

export{
    checkSubCategoryExistOrNot,checkCategoryExistOrNot,checkBrandExistOrNot,checkProductExistOrNot,checkEmail
}