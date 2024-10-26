import express, { Router } from 'express';
import { addProduct, allProduct, deleteProduct, getProduct, updateProduct } from './product.controller.js';
import { checkProductExistOrNot } from '../../middleware/checkExist.js';
import { uploadMixOfFile } from '../../fileUpload.js';
const productRouter= Router();

productRouter.route('/').post(uploadMixOfFile([{name:'imgCover',maxCount:1},{name:'images',maxCount:8}],"products") ,addProduct).get(allProduct)
productRouter.route('/:id').get(checkProductExistOrNot,getProduct).put(checkProductExistOrNot,updateProduct).delete(checkProductExistOrNot,deleteProduct)


export{
    productRouter
}