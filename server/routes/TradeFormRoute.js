import express from "express"
// /api/buy
// /api
import { WrapAsync } from "../middlewares/WrapAsync.js"
import { buyStock, deleteStock, editStock, getDashboard, showStock } from "../controllers/TradeFormController.js";
const router = express.Router();
router.get("/", WrapAsync(getDashboard));
router.post("/trade", WrapAsync(buyStock));
router.get("/list", WrapAsync(showStock));
router.patch("/:id/edit", WrapAsync(editStock));
router.delete("/:id/delete", WrapAsync(deleteStock));
router.get("/account", (req, res) => {
  res.json({ balance: 10000 });
});
export default router;