import express, { Router } from 'express';
import { addUser, deleteUser, getAllUsers, getSpecificUser, updateUser } from './user.controller.js';
const userRouter= Router();

userRouter.route('/').post(addUser).get(getAllUsers)
userRouter.route('/:id').get(getSpecificUser).put(updateUser).delete(deleteUser)


export{
    userRouter
}