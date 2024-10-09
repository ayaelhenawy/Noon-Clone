import { addCategory } from "./category/category.controller.js"
import { categoryRouter } from "./category/category.router.js"

export const bootstrap=(app)=>{

    app.use('/api/categories',categoryRouter)
}
