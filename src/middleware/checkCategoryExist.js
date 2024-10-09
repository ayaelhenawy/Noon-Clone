import { categoryModel } from "../../DataBase/models/category.model.js"
import { AppError } from "../utilts/appError.js";

export const checkCategoryExistOrNot=async(req,res,next)=>{
    let category=await categoryModel.findById(req.params.id);
    if(category)next();
    else {
        next(new AppError(`this category nof found  ${req.originalUrl}`,404))
    }



}