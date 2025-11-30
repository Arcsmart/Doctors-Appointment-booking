import validator from "validator";
import bycrpt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import "dotenv/config";
import axios from 'axios'
// Api to register

const registerUer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ sucess: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ sucess: false, message: "Enter a valid email" });
    }
    if (password.length < 6) {
      return res.json({
        sucess: false,
        message: "Enter a Strong  password please",
      });
    }
    // hashing user password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ sucess: true, message: "User Registered successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};
// Api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ sucess: false, message: "User does not exist " });
    }
    const isMatch = await bycrpt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ sucess: true, token });
    } else {
      res.json({ sucess: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};
// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    //  const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ sucess: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

// ApI to Update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ sucess: false, message: "Data Missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // upload image from cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ sucess: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};
// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ sucess: false, message: "Doctor not avilable" });
    }
    let slots_booked = docData.slots_booked;
    // checking for slot avialablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ sucess: false, message: "slot not avilable" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fee,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slota data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ sucess: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

// ApI to get user appointments for frontend my appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({ sucess: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};
//  API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ sucess: false, message: "Unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // relssing doctor slot data

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ sucess: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

// API to make  payment of appointment using chapa

const paymentChapa = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }

   
    const tx_ref = `tx-${appointmentId}-${Date.now()}`;

    // name handling
    const fullName = appointmentData.userData.name || "Guest User";
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName =
      nameParts.length > 1 ? nameParts.slice(1).join(" ") : "Customer";

   
    // Chapa requires 'amount' to be a string, not a number.
    const data = {
      amount: appointmentData.amount.toString(),
      currency: process.env.CURRENCY || "ETB",
      email: appointmentData.userData.email,
      first_name: firstName,
      last_name: lastName,
      tx_ref: tx_ref,
      callback_url:
        "https://backend-zeta-indol.vercel.app/api/user/verify-chapa",
      return_url: "https://wecarebook.vercel.app/myappointments",
      customization: {
        title: "Medical Payment",
        description: `Appointment ID ${appointmentId}`,
      },
    };
   
    

    //  preper headers 
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    
    // This bypasses the wrapper library so we can see real errors
    const response = await axios.post(process.env.CHAPA_INTIAZE, data, config);

    if (response.data.status === "success") {
      return res.json({
        success: true,
        checkout_url: response.data.data.checkout_url,
        tx_ref: tx_ref,
      });
    } else {
      return res.json({
        success: false,
        message: "Chapa initialization failed",
      });
    }
  } catch (error) {
  
    console.log("chapa error details",error);
  }
};

// verifying chapa payment
const verifyChapa = async (req, res) => {
  try {
    const { tx_ref } = req.body;

    if (!tx_ref) {
      return res.json({
        success: false,
        message: "Transaction reference is required",
      });
    }

    //  Verify with Chapa Server
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    };

    // Chapa Verify API
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      config
    );

    //  Check if payment was successful
    if (response.data.status === "success") {
      
      const parts = tx_ref.split("-");
      const appointmentId = parts[1]; 

      
       const appointmentData  =  await appointmentModel.findByIdAndUpdate  (appointmentId, {
        payment: true,
         new: true 
      });

      return res.json({
        success: true,
        message: "Payment Successfully",
        amount: appointmentData.amount, 
        name: appointmentData.userData.name,
        data: response.data.data,
      });
    } else {
      return res.json({
        success: false,
        message: "Payment faild",
      });
    }
  } catch (error) {
    console.log(" verfication error:",error);
    ;
  }
};

export {
  registerUer,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentChapa,
  verifyChapa,
};
