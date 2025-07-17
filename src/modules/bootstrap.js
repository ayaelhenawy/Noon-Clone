
import authRouter from "./auth/auth.router.js"
import { BrandRouter } from "./brand/brand.router.js"
import { categoryRouter } from "./category/category.router.js"
import { productRouter } from "./product/product.router.js"
import { subCategoryRouter } from "./subCategory/subCategory.router.js"
import { userRouter } from "./user/user.router.js"

export const bootstrap=(app)=>{
    app.use('/api/categories',categoryRouter)
    app.use('/api/subCategories',subCategoryRouter)
    app.use('/api/brands',BrandRouter)
    app.use('/api/products',productRouter)
    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/auth',authRouter)
}
