import express, { Router } from 'express';
import { addCategory, allCategory, deleteCategory, getCategory, updateCategory } from './category.controller.js';
const categoryRouter= Router();

categoryRouter.route('/').post(addCategory).get(allCategory)
categoryRouter.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory)


export{
    categoryRouter
}