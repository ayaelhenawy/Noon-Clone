import express from 'express'
import { categoryModel } from './DataBase/models/category.model.js'
import { dbconnection } from './DataBase/DBConnection.js'
import { categoryRouter } from './src/modules/category/category.router.js'
const app = express()
const port = 3000



dbconnection()
app.use(express.json())
app.use(categoryRouter)


process.on('unhandledRejection',(err)=>{
    console.log('error',err.message);
})
app.listen(port, () => console.log(`Server is running...`))