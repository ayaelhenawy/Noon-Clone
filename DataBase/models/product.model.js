
import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    title:{
        type:String,
        unique:[true,'title is unique'],
        trim:true,
        required:true,
        minlength:[2,'too short title'],
        maxLength:[200,'too long title'],
    },
    slug:{
        type:String,
        lowercase:true,
        required:true,
    },
    description:{
        type:String,
        trim:true,
        required:true,
        minlength:[2,'too short title'],
        maxLength:[200,'too long description']
    },
    imgCover:String,
    images:[],
    rateAvg:{
        type:Number,
        min:0,
        max:5,
    },
    rateCount:{
        type:Number,
        min:0,
        default:0
    },
    price:{
        type:Number,
        min:0,
        required:true,
    },
    priceAfterDiscount:{
        type:Number,
        min:0,
        required:true,
    },
    stock:{
        type:Number,
        min:0,
        default:0
    },
    sold:Number,
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:'subCategory'
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    }



    
    
},{timestamps:true})

productSchema.post('init',function(doc){
    if(doc.imgCover) doc.imgCover=process.env.BASE_URL+"uploads/products/"+doc.imgCover;
    if(doc.images) doc.images=doc.images.map((ele)=>ele=process.env.BASE_URL+"uploads/products/"+ele)
})

export const productModel=mongoose.model('product',productSchema);