import Stock from "../models/TradeFormSchema.js"
import ExpressError from "../middlewares/ExpressError.js"
export const getDashboard = async (req, res) => {
    console.log("get request received")
}
export const buyStock = async (req, res, next) => {
    console.log("buy request received", req.body)
    const newStock = await Stock.create(req.body);
    if (!newStock) return next(new ExpressError(401, "No stock created"))
    console.log("new stock created", newStock)
    res.status(201).json({ success: true, data: newStock });
}
export const showStock = async (req, res) => {
    const stocks = await Stock.find({});
    const { sortKey="symbol", sortOrder="", search="" } = req.query
    console.log("sort values: ", sortKey, sortOrder)
    const query = {}
    if(search) query.symbol = { $regex: search, $options: "i" }
    const sortOptions = {}
    if (sortKey === "qty") sortOptions.qty = sortOrder
    if (sortKey === "symbol") sortOptions.symbol = sortOrder
    if (sortKey === "price") sortOptions.price = sortOrder
    console.log("query: ", sortOptions)
    const pagination = await Stock.find(query).sort(sortOptions)
    const totalNoOfStocks = await Stock.countDocuments();
    res.json({ stocks, totalNoOfStocks: totalNoOfStocks, pagination })
}
export const editStock = async (req, res) => {
    const { id } = req.params;
    const updatedStock = await Stock.findByIdAndUpdate(id, req.body);
    console.log("updated stock: ", updatedStock)
    res.json({ message: "Edited Successfully", updatedStock: updatedStock })
}
export const deleteStock = async (req, res) => {
    const { id } = req.params;
    const deletedStock = await Stock.findByIdAndDelete(id);
    console.log("deleted stock: ", deletedStock)
    res.json({ message: "Deleted Successfully", deleteStock: deleteStock })
}