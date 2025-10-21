import mongoose from "mongoose";

const TradeFormSchema = new mongoose.Schema({
    qty: {
        type: Number,
        required: true,
    },
    stopLoss: {
        type: Number,
        required: true,
    },
    takeProfit: {
        type: Number,
        required: true,
    },
    symbol: {
        type: String,
    }
}, { timestamps: true })
const Stock = mongoose.model("Stock", TradeFormSchema);
export default Stock;