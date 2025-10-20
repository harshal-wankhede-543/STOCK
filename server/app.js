import "dotenv/config"
import express from "express"
import TradeFormRoutes from "./routes/TradeFormRoute.js"
import cors from "cors"
import { connectDB } from "./init/db.js"

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
}))

connectDB();
app.use("/api/buy", TradeFormRoutes)
app.use("/api", TradeFormRoutes)
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
})
export default app;