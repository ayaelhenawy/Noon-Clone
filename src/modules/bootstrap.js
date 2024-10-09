
import { categoryRouter } from "./category/category.router.js"
import { subCategoryRouter } from "./subCategory/subCategory.router.js"

export const bootstrap=(app)=>{

    app.use('/api/categories',categoryRouter)
    app.use('/api/subCategories',subCategoryRouter)
}
