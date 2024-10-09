import slugify from "slugify";
import { categoryModel } from "../../../DataBase/models/category.model.js"

export const addCategory=async(req,res)=>{
    req.body.slug=slugify(req.body.name)
    let category=new categoryModel(req.body);
    console.log(category);
    await category.save()
    res.json({message:"success",category})
}