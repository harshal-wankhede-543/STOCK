import express from "express"
// /api/buy
import { WrapAsync } from "../middlewares/WrapAsync.js"
import { buyStock, helloWorld, showStock } from "../controllers/TradeFormController.js";
const router = express.Router();
router.get("/", WrapAsync(helloWorld));
router.post("/", WrapAsync(buyStock));
router.get("/list", WrapAsync(showStock));
export default router;