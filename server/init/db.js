import mongoose from "mongoose";
import { stockList } from "../init/init.js"
import { Trade, Stock } from "../models/TradeFormSchema.js";
export const connectDB = async () => {
    const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/stock-trading"
    try {
        await mongoose.connect(MONGO_URL)
        await Stock.deleteMany({})
        await Stock.insertMany(stockList)
        console.log("stocks added")
    } catch (err) {
        console.error("❌ Error inserting stocks:", err.message);
    }
}