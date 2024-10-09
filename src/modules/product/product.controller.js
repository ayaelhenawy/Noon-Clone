import slugify from "slugify";

import { catchError } from "../../middleware/catchGlobalError.js";
import { productModel } from "../../../DataBase/models/product.model.js";


const addProduct=async(req,res)=>{
    req.body.slug=slugify(req.body.title)
    let Product=new productModel(req.body);
    console.log(Product);
    await Product.save()
    res.json({message:"success",Product})
}

const allProduct=catchError(async(req,res)=>{
    let product=await productModel.find();
    res.json({message:"success",product})
})

const getProduct=catchError(
    async(req,res)=>{
        let product=await productModel.findById(req.params.id);
        res.json({message:"success",product})
    }
)


const updateProduct=catchError(
    async(req,res)=>{
        req.body.slug=slugify(req.body.title)
        let product=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json({message:"success",product})
    }
)
const deleteProduct=catchError(
    async(req,res)=>{
        let product=await productModel.findByIdAndDelete(req.params.id);
        res.json({message:"success",product})
    }
)


export{
    addProduct,allProduct,getProduct,updateProduct,deleteProduct
}