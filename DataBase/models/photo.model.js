import mongoose from "mongoose";


const photoSchema=mongoose.Schema(
    {
        title:String,
        img:String,
        images:[String]

    }
)
photoSchema.post('init',function(doc){
    doc.img=process.env.BASE_URL+doc.img;
})
export const photoModel=mongoose.model('photo',photoSchema);