import slugify from "slugify";

import { catchError } from "../../middleware/catchGlobalError.js";
import { productModel } from "../../../DataBase/models/product.model.js";



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
    //-----pagination---------
    let pageNumber=req.query.page*1||1
    if(req.query.page<0)pageNumber=1;
    const limit=2;
    let skip=(pageNumber-1)*limit
    //-------Filter-------------
    let productFilter=req.query;
    let copyProductFilter=structuredClone(productFilter);
    copyProductFilter=JSON.stringify(copyProductFilter)
    copyProductFilter=copyProductFilter.replace(/(gt|gte|lt|lte)/g,(value)=>{
        return `$${value}`;
    })
    copyProductFilter=JSON.parse(copyProductFilter)
    console.log(copyProductFilter);
    delete copyProductFilter['page'];
    delete copyProductFilter['sort'];
    delete copyProductFilter['search'];

    //-----------sort-----------------

    let mongooseQuery=productModel.find().skip(skip).limit(limit);
    if(req.query.sort){
        let sortBy=req.query.sort.split(',').join(' ');
        mongooseQuery=mongooseQuery.sort(sortBy);
    }

    //----------slected Fields----------
    if(req.query.fields){
        let selectedFields=req.query.fields.split(',').join(' ');
        console.log(selectedFields)
        mongooseQuery=mongooseQuery.select(selectedFields);
    }
    //-------search---------------
    if(req.query.search){
        mongooseQuery=mongooseQuery.find({
        $or:[
            {title:{$regex:req.query.search,$options:'i'}},
            {description:{$regex:req.query.search,$options:'i'}}

        ]
        }
        )
    }

    let product=await mongooseQuery;
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