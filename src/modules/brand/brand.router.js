import express, { Router } from 'express';
import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from './brand.controller.js';
import { checkBrandExistOrNot } from '../../middleware/checkExist.js';
import { uploadSingleFile } from '../../fileUpload.js';
const BrandRouter= Router();

BrandRouter.route('/').post(uploadSingleFile('logo','brands'),addBrand).get(allBrands)
BrandRouter.route('/:id').get(checkBrandExistOrNot,getBrand).put(checkBrandExistOrNot,uploadSingleFile('logo','brands'),updateBrand).delete(checkBrandExistOrNot,deleteBrand)


export{
    BrandRouter
}