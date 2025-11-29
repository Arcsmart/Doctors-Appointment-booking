import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRoute from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRoute from './routes/userRoute.js'

// app config 
const app = express()
const port = process .env.PORT || 4000
connectDB()
connectCloudinary()
// middleware

const corsOptions = {
  origin: [
    "https://wecarebook.vercel.app",
    "https://wecareadmin-eight.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Date",
    "X-Api-Version",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.options("*", cors(corsOptions));

// api endpoints
 app.use("/api/admin", adminRoute);
app.use('/api/doctor',doctorRouter)
app.use("/api/user",userRoute);

app.get ('/',(req,res)=>{
  res.send('Api working')        
})

app.listen(port,()=>{
  console.log('Server starting',port)        
})