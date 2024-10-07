import express from 'express'
import { categoryModel } from './DataBase/models/category.model.js'
import { dbconnection } from './DataBase/DBConnection.js'
const app = express()
const port = 3000



dbconnection()

app.get('/', async (req, res) => {
    await categoryModel.insertMany({ name: "mobile", slug: "mobile", image: "11111111" });
    res.json({ message: "success" });
});

process.on('unhandledRejection',(err)=>{
    console.log('error');
})
app.listen(port, () => console.log(`Server is running...`))