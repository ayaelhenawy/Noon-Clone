export const validation=(schema)=>{
    return (req,res,next)=>{
    const {error}=schema.validate({image:req.files,...req.body,...req.params},{abortEarly:false});
    console.log(error);
    if(!error){
    next();
    }
    else {
        let err=[];
        error.details.forEach(element => {
            err.push(element.message);
        });
        res.json({message:"Error",error:err});
    }
}
}