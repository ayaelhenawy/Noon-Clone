import express, { Router } from 'express';
import { addCategory, allCategory, deleteCategory, getCategory, updateCategory } from './category.controller.js';
import { checkCategoryExistOrNot } from '../../middleware/checkExist.js';
const categoryRouter= Router();

categoryRouter.route('/').post(addCategory).get(allCategory)
categoryRouter.route('/:id').get(checkCategoryExistOrNot,getCategory).put(checkCategoryExistOrNot,updateCategory).delete(checkCategoryExistOrNot,deleteCategory)


export{
    categoryRouter
}