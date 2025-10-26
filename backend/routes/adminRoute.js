import express from 'express'

import { addDoctor ,loginAdmin} from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js';
const adminRoute = express.Router()
adminRoute.post("/add-doctor",authAdmin ,upload.single("image"), addDoctor);
adminRoute.post("/login",  loginAdmin);

export default adminRoute