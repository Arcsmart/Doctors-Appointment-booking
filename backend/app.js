import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRoute from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRoute from "./routes/userRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middleware

const allowedOrigins = [
  "https://wecarebook.vercel.app",

  "https://wecareadmin-eight.vercel.app",
];

// 1. Handle Preflight requests for ALL routes
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// 2. Standard CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

// api endpoints
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => {
  console.log("Server starting", port);
});
