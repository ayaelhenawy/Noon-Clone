import slugify from "slugify";
import { brandModel } from "../../../DataBase/models/brand.model.js"
import { catchError } from "../../middleware/catchGlobalError.js";


const addBrand=async(req,res)=>{
    req.body.slug=slugify(req.body.name)
    req.body.logo=req.file.filename
    let brand=new brandModel(req.body);
    console.log(brand);
    await brand.save()
    res.json({message:"success",brand})
}

const allBrands=catchError(async(req,res)=>{
    let brands=await brandModel.find();
    res.json({message:"success",brands})
})

const getBrand=catchError(
    async(req,res)=>{
        let brand=await brandModel.findById(req.params.id);
        res.json({message:"success",brand})
    }
)


const updateBrand=catchError(
    async(req,res)=>{
        req.body.slug=slugify(req.body.name)
        req.body.logo=req.file.filename;
        let brand=await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json({message:"success",brand})
    }
)
const deleteBrand=catchError(
    async(req,res)=>{
        let brand=await brandModel.findByIdAndDelete(req.params.id);
        res.json({message:"success",brand})
    }
)


export{
    addBrand,allBrands,getBrand,updateBrand,deleteBrand
}