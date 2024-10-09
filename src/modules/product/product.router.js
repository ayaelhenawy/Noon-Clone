import express, { Router } from 'express';
import { addProduct, allProduct, deleteProduct, getProduct, updateProduct } from './product.controller.js';
import { checkProductExistOrNot } from '../../middleware/checkExist.js';
const productRouter= Router();

productRouter.route('/').post(addProduct).get(allProduct)
productRouter.route('/:id').get(checkProductExistOrNot,getProduct).put(checkProductExistOrNot,updateProduct).delete(checkProductExistOrNot,deleteProduct)


export{
    productRouter
}