// connect mongodb
import mongoose from "mongoose";

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Reusing mongo connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB URI is missing");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
}
