
let x='dev';

export const  globalErrorMiddleware=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    if(x=='dev')
    res.status(err.statusCode).json({error:err.message,stack:err.stack});
else 
res.status(err.statusCode).json({error:err.message}); 

}