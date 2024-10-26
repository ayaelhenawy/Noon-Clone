import express, { Router } from 'express';
import { addCategory, allCategory, deleteCategory, getCategory, updateCategory } from './category.controller.js';
import { checkCategoryExistOrNot } from '../../middleware/checkExist.js';
import { uploadSingleFile } from '../../fileUpload.js';
import { validation } from '../../middleware/validate.js';
import { addCategoryValidation } from './category.validation.js';
import { subCategoryRouter } from '../subCategory/subCategory.router.js';
const categoryRouter= Router();


categoryRouter.use('/:category/subCategories',subCategoryRouter)
categoryRouter.route('/').post(uploadSingleFile('image','categories'),validation(addCategoryValidation),addCategory).get(allCategory)
categoryRouter.route('/:id').get(checkCategoryExistOrNot,getCategory).put(checkCategoryExistOrNot,uploadSingleFile('image','categories'),updateCategory).delete(checkCategoryExistOrNot,deleteCategory)


export{
    categoryRouter
}