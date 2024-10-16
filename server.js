import express from 'express'
import { categoryModel } from './DataBase/models/category.model.js'
import { dbconnection } from './DataBase/DBConnection.js'
import { categoryRouter } from './src/modules/category/category.router.js'
import {bootstrap} from './src/modules/bootstrap.js'
import { globalErrorMiddleware } from './src/middleware/globalErrorMiddleware.js'
import { AppError } from './src/utilts/appError.js'
import {v4 as uuidv4} from 'uuid'
import { photoModel } from './DataBase/models/photo.model.js'
import multer  from 'multer'
import dotenv from "dotenv"
import { uploadMixOfFile, uploadSingleFile } from './src/fileUpload.js'

const app = express()
const port = 3000
dotenv.config()


app.use(express.json())
app.use('/',express.static('uploads'))
//app.use(categoryRouter)
bootstrap(app);






dbconnection()
app.use('*',(req,res,next)=>{
    next(new AppError(`Not Found endpoint ${req.originalUrl}`,404));
})

app.use(globalErrorMiddleware)
// العمده
// catchError  هنا وحدت الريسبونس ال ال فانكشن اللي اسمها 
// دي  middleware  تلاقي هتيجي لل   error  اللي جواها اول متشوف next  ال 


app.listen(port, () => console.log(`Server is running...✌`))