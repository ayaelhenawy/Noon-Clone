import express from 'express';
import { addCategory } from './category.controller.js';
const categoryRouter= express.Router();

categoryRouter.post('/category',addCategory);


export{
    categoryRouter
}