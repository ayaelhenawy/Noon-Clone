import { categoryModel } from "../../DataBase/models/category.model.js"

export const checkCategoryExistOrNot=async(req,res,next)=>{
    let category=await categoryModel.findById(req.params.id);
    if(category)next();
    else {
        res.json({message:"this Category not exist!"})
    }



}