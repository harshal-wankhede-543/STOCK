import Stock from "../models/TradeFormSchema.js"
import ExpressError from "../middlewares/ExpressError.js"
export const helloWorld = async (req, res) => {
    res.send("Hello World!");
}
export const buyStock =  async (req, res,next) => {
    console.log("buy request received", req.body)
    const newStock = await Stock.create(req.body);
    if(!newStock) return next(new ExpressError(401, "No stock created"))
    console.log("new stock created", newStock)
    res.status(201).json({ success: true, data: newStock });
}
export const showStock = async (req, res) => {
    const stocks = await Stock.find({});
    res.json(stocks)
    console.log("all stocks: ", stocks)
}