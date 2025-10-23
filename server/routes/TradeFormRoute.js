import express from "express"
// /api/stocks
import { WrapAsync } from "../middlewares/WrapAsync.js"
import { buyStock, deleteStock, editStock, getDashboard, showStock } from "../controllers/TradeFormController.js";
const router = express.Router();
router.get("/", WrapAsync(getDashboard));
router.post("/buy", WrapAsync(buyStock));
router.get("/all-list", WrapAsync(showStock));
router.get("/buy-list", WrapAsync(showStock));
router.patch("/:id/edit", WrapAsync(editStock));
router.delete("/:id/delete", WrapAsync(deleteStock));
router.get("/account", (req, res) => {
  res.json({ balance: 10000 });
});
export default router;