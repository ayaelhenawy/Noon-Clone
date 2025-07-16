import slugify from "slugify";

import { catchError } from "../../middleware/catchGlobalError.js";
import { productModel } from "../../../DataBase/models/product.model.js";
import { ApiFeature } from "../../utilts/apiFeature.js";



const addProduct=async(req,res)=>{
    req.body.slug=slugify(req.body.title)
    req.body.imgCover=req.files.imgCover[0].filename;
    req.body.images=req.files.images.map((ele)=>ele.filename)
    let Product=new productModel(req.body);
    console.log(Product);
    await Product.save()
    res.json({message:"success",Product})
}

const allProduct=catchError(async(req,res)=>{

    let apiFeature=new ApiFeature(productModel.find(),req.query)
    .pagination().fields().filter().sort().search()

    let product=await apiFeature.mongooseQuery;
    res.json({message:"success",page:apiFeature.pageNumber,product})
})

const getProduct=catchError(
    async(req,res)=>{
        let product=await productModel.findById(req.params.id);
        res.json({message:"success",product})
    }
)


const updateProduct=catchError(
    async(req,res)=>{
        if(req.body.title)
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