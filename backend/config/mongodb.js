import mongoose from "mongoose";

const connectDB = async () => {
  try {
    
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );

    
    mongoose.connection.on("error", (err) =>
      console.error("Database connection error:", err)
    );

    
    await mongoose.connect(process.env.MON_URL, {
      dbName: "wecare",
    });
  } catch (error) {
    
    console.error("Could not connect to database:", error.message);
    process.exit(1); 
  }
};

export default connectDB;