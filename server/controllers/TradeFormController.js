// import Stock from "../models/TradeFormSchema.js"
import ExpressError from "../middlewares/ExpressError.js"
import { Trade, Stock } from "../models/TradeFormSchema.js"
export const getDashboard = async (req, res) => {
    console.log("get request received")
}
export const buyStock = async (req, res, next) => {
    console.log("buy request received", req.body)
    const newStock = await Trade.create(req.body);
    if (!newStock) return next(new ExpressError(401, "No stock created"))
    console.log("new stock created", newStock)
    res.status(201).json({ success: true, data: newStock });
}
// export const showStock = async (req, res) => {
//     const stocks = await Stock.find({});
//     // console.log("all stocks: ", stocks)
//     const { sortKey="symbol", sortOrder="asc", search="" } = req.query
//     console.log("sort values: ", sortKey, sortOrder)
//     const query = {}
//     if(search) query.symbol = { $regex: search, $options: "i" }
//     console.log("query: ", query)
//     const sortOptions = {}
//     if (sortKey === "qty") sortOptions.qty = sortOrder
//     if (sortKey === "symbol") sortOptions.symbol = sortOrder
//     if (sortKey === "price") sortOptions.price = sortOrder
//     console.log("query: ", sortOptions)
//     const pagination = await Stock.find(query).sort(sortOptions)
//     console.log("query 2", query)
//     const totalNoOfStocks = await Stock.countDocuments();
//     res.json({ stocks, totalNoOfStocks: totalNoOfStocks, pagination })
// }
export const showStock = async (req, res) => {
    let result, totalNoOfStocks;
    // If the path is /all-list → show all stocks
    if (req.originalUrl.includes("all-list")) {
        const { sortKey = "symbol", sortOrder = "asc", search = "" } = req.query;
        const query = {};
        if (search) query.symbol = { $regex: search, $options: "i" };
        const sortOptions = {};
        if (sortKey === "qty") sortOptions.qty = sortOrder;
        if (sortKey === "symbol") sortOptions.symbol = sortOrder;
        if (sortKey === "price") sortOptions.price = sortOrder;

        result = await Stock.find(query).sort(sortOptions);
        totalNoOfStocks = await Stock.countDocuments(query);

        res.json({ stocks: result, totalNoOfStocks, pagination: result });
    }
    // If the path is /buy-list → show trades only
    else if (req.originalUrl.includes("buy-list")) {
        const { sortKey = "name", sortOrder = "asc", search = "" } = req.query;
        const query = {};
        if (search) query.name = { $regex: search, $options: "i" };
        const sortOptions = {};
        if (sortKey === "qty") sortOptions.qty = sortOrder;
        if (sortKey === "name") sortOptions.name = sortOrder;
        if (sortKey === "price") sortOptions.price = sortOrder;
        // console.log("sort options: ", sortOptions, query)
        result = await Trade.find(query).sort(sortOptions);
        // console.log("all trades: ", result)
        totalNoOfStocks = await Trade.countDocuments(query);

        res.json({ trades: result, totalNoOfTrades: totalNoOfStocks, pagination: result });
    } else {
        res.status(404).json({ message: "Route not found" });
    }
}

export const editStock = async (req, res) => {
    const { id } = req.params;
    const { qty, price } = req.body;
    const updatedStock = await Trade.findByIdAndUpdate(id, { qty, price });
    console.log("updated stock: ", updatedStock)
    res.json({ message: "Edited Successfully", updatedStock: updatedStock })
}
export const deleteStock = async (req, res) => {
    const { id } = req.params;
    const deletedStock = await Trade.findByIdAndDelete(id);
    console.log("deleted stock: ", deletedStock)
    res.json({ message: "Deleted Successfully", deletedStock: deletedStock })
}