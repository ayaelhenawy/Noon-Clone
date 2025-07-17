import express from 'express'
import { changeUserPassword, signin, signup } from './auth.controller.js'
import { checkEmail } from '../../middleware/checkExist.js'


const authRouter=express.Router()

authRouter.post('/signup',checkEmail,signup)
authRouter.post('/signin',signin)
authRouter.patch('/change-password',changeUserPassword)

export default authRouter