
import { categoryModel } from "../../DataBase/models/category.model.js";
import { subCategoryModel } from "../../DataBase/models/subCategory.model.js";
import { AppError } from "../utilts/appError.js";

const checkCategoryExistOrNot=async(req,res,next)=>{
    let category=await categoryModel.findById(req.params.id);
    if(category)next();
    else {
        next(new AppError(`this category nof found  ${req.originalUrl}`,404))
    }



}
const checkSubCategoryExistOrNot=async(req,res,next)=>{
    let subCategory=await subCategoryModel.findById(req.params.id);
    if(subCategory)next();
    else {
        next(new AppError(`this subCategory nof found  ${req.originalUrl}`,404))
    }


}

export{
    checkSubCategoryExistOrNot,checkCategoryExistOrNot
}