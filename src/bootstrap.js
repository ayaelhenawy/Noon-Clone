


import authRouter from "./modules/auth/auth.router.js"
import { BrandRouter } from "./modules/brand/brand.router.js"
import { categoryRouter } from "./modules/category/category.router.js"
import { productRouter } from "./modules/product/product.router.js"
import { subCategoryRouter } from "./modules/subCategory/subCategory.router.js"
import { userRouter } from "./modules/user/user.router.js"




const bootstraps=(app)=>{
    app.use('/api/categories',categoryRouter)
    app.use('/api/subCategories',subCategoryRouter)
    app.use('/api/brands',BrandRouter)
    app.use('/api/products',productRouter)
    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/auth',authRouter)
}
export {
bootstraps
} 
