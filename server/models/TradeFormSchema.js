import mongoose from "mongoose";
const TradeFormSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
    },
    
}, { timestamps: true })
export const Trade = mongoose.model("Trade", TradeFormSchema);
const StocksFormSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
    },
    
}, { timestamps: true })
export const Stock = mongoose.model("Stock", StocksFormSchema);