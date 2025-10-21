


import { userModel } from '../../../DataBase/models/user.model.js'
import { catchError } from '../../middleware/catchGlobalError.js'
import { AppError } from "../../utilts/appError.js"

const addToWishlist = catchError(async(req,res,next)=>{

    let wishlist =await userModel.findByIdAndUpdate(req.user.id,
        {$addToSet: {wishlist:req.body.product}},{new:true})

    wishlist || next(new AppError('wishlist not found',404))
    !wishlist || res.json({message:"success",wishlist: wishlist.wishlist})
})

const removeFromWishlist = catchError(async(req,res,next)=>{

    let wishlist =await userModel.findByIdAndUpdate(req.user.id,
        {$pull: {wishlist:req.params.id}},{new:true})

    wishlist || next(new AppError('wishlist not found',404))
    !wishlist || res.json({message:"success",wishlist: wishlist.wishlist})
})

const getLoggedUserWishlist = catchError(async(req,res,next)=>{

    let wishlist =await userModel.findById(req.user.id).populate('wishlist')

    wishlist || next(new AppError('wishlist not found',404))
    !wishlist || res.json({message:"success",wishlist: wishlist.wishlist})
})

export {
    addToWishlist,
    removeFromWishlist,
    getLoggedUserWishlist
}