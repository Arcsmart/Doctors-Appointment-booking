import express from 'express'

import { addDoctor ,adminDashboard,allDoctors,appointmentAdmin,appointmentCancel,loginAdmin} from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js';
import { changeAvilabilty } from '../controllers/doctorController.js';
const adminRoute = express.Router()
adminRoute.post("/add-doctor",authAdmin ,upload.single("image"), addDoctor);
adminRoute.post("/login",  loginAdmin);
adminRoute.post("/all-doctors",authAdmin ,allDoctors);
adminRoute.post("/change-avilablity", authAdmin, changeAvilabilty);
adminRoute.get('/appointments',authAdmin,appointmentAdmin);
adminRoute.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRoute.get("/dashboard", authAdmin, adminDashboard);


export default adminRoute