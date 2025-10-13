import express from 'express'
import { changeUserPassword, protectedRoutes, signin, signup, verifyEmail } from './auth.controller.js'
import { checkEmail } from '../../middleware/checkExist.js'
import { protect } from '../../middleware/authMiddleware.js'


const authRouter=express.Router()

authRouter.post('/signup',checkEmail,signup)
authRouter.post('/signin',signin)
authRouter.patch('/change-password',changeUserPassword)
authRouter.get('/verifyEmail/:token',verifyEmail);

export default authRouter