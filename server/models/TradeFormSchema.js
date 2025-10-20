import mongoose from "mongoose";

const TradeFormSchema = new mongoose.Schema({
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    symbol: {
        type: String,
    }
})
const Stock = mongoose.model("Stock", TradeFormSchema);
export default Stock;