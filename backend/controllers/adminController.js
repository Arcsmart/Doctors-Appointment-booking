import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import "dotenv/config";
const addDoctor = async (req,res)=> { 
  try {
     const {
       name,
       email,
       password,
       spaciality,
       degree,
       experience,
       about,
       fee,
       address,
       
     } = req.body;  
     const imageFile = req.file   
     // checking for all data to doctor
     if(!name||
       !email||
       !password||
       !degree||
       !experience||

       !about||
       !fee||
       !address){
        return res.json({sucess:false ,message:"Missing Details"})
       }
       // validating email

       if(!validator.isEmail(email)){
        return res.json({ sucess: false, message: "Please enter a valid email" });
       }
       // checking email duplicate
       const existingDoctor = await doctorModel.findOne({ email });
       if (existingDoctor) {
         return res.json({
           sucess: false,
           message: "This email is already registered.",
         });
       }
       // validating strong password
       if(password.length<6){
        return res.json({ sucess: false, message: "Please enter a strong password" });
       }
       // hashing doctor password
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)

       // upload image cloudinary
       const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
         resource_type: "image",
         timeout: 60000,
       });
        const immageUrl=imageUpload.secure_url
        const doctorData = {
          name,
          email,
          image:immageUrl,
          password:hashedPassword,
          spaciality,
          degree,
          experience,
          about,
          fee,
          address:JSON.parse(address)
          ,date:Date.now()

        };
        
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        return res.json({ sucess: true, message: "Doctor Added" });
        
  } catch (error) {
      console.error(error); 
      if (error.code === 11000) {
        return res.status(400).json({
          sucess: false,
          message: "This email is already registered.",
        });
      }
      res
        .status(500)
        .json({sucess:false, message: "Error adding doctor", error: error.message });    
  }
}

const loginAdmin= async (req,res)=>{
  try {
    const {email,password}=req.body
    if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
     res.json({sucess:true,token})
    }else{
      res.json({sucess:false,message:'Invalid credentials'})
    }
  } catch (error) {
    console.log(error)
    res.json({sucess:false,message:"Error",error:error.message})
  }
}

export { addDoctor, loginAdmin };