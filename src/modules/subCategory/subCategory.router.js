import express, { Router } from 'express';
import { addsubCategory, allsubCategory, deletesubCategory, getsubCategory, updatesubCategory } from './subCategory.controller.js';
import { checkSubCategoryExistOrNot } from '../../middleware/checkExist.js';

const subCategoryRouter= Router({mergeParams:true});

subCategoryRouter.route('/').post(addsubCategory).get(allsubCategory)
subCategoryRouter.route('/:id').get(checkSubCategoryExistOrNot,getsubCategory).put(checkSubCategoryExistOrNot,updatesubCategory).delete(checkSubCategoryExistOrNot,deletesubCategory)


export{
    subCategoryRouter
}