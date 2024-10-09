import express, { Router } from 'express';
import { addCategory, allCategory, getCategory } from './category.controller.js';
const categoryRouter= Router();

categoryRouter.route('/').post(addCategory).get(allCategory)
categoryRouter.route('/:id').get(getCategory);


export{
    categoryRouter
}