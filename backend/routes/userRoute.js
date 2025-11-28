import express from 'express'

import { registerUer,loginUser, getProfile, updateProfile,bookAppointment, listAppointment, cancelAppointment, paymentChapa, verifyChapa } from '../controllers/userController.js'
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';
const userRouter = express.Router()
userRouter.post('/register',registerUer)

userRouter.post("/login", loginUser);
userRouter.get('/get-profile',authUser,getProfile)

userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post("/book-appointment", authUser,bookAppointment);
userRouter.get('/appointments',authUser,listAppointment)

userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-chapa',authUser,paymentChapa)
userRouter.post('/verify-chapa',authUser,verifyChapa)

export default userRouter