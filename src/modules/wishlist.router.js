import { Router } from 'express'
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from './wishlist.controller.js'
import { protectedRoutes } from './auth/auth.controller.js'


const wishlistRouter = Router()

wishlistRouter.route('/')
    .patch(protectedRoutes,addToWishlist)
    .get(protectedRoutes,getLoggedUserWishlist)
wishlistRouter.route('/:id')
    .patch(protectedRoutes,removeFromWishlist)

export default wishlistRouter