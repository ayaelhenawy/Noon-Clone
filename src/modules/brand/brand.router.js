import express, { Router } from 'express';
import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from './brand.controller.js';
import { checkBrandExistOrNot } from '../../middleware/checkExist.js';
const BrandRouter= Router();

BrandRouter.route('/').post(addBrand).get(allBrands)
BrandRouter.route('/:id').get(checkBrandExistOrNot,getBrand).put(checkBrandExistOrNot,updateBrand).delete(checkBrandExistOrNot,deleteBrand)


export{
    BrandRouter
}