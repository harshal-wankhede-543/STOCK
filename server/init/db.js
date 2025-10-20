import mongoose from "mongoose";

export const connectDB = () => {
    const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/stock-trading"
    mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err))
}