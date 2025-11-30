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

// pp.options("*", cors());
const allowedOrigins = [
  "https://wecarebook.vercel.app",

  "https://wecareadmin-eight.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS Policy: Origin not allowed"), false);
      }

      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "token"],
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

// app.listen(port, () => {
//   console.log("Server starting", port);
// });

export default app;
