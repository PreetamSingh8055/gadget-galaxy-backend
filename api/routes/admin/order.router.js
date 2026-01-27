import express from "express";
import { protect, onlyAdmin } from "../../middleware/auth.middleware.js";
import { getAllOrders } from "../../controllers/admin/order.controller.js";

const router = express.Router();

router.get("/orders", protect, onlyAdmin, getAllOrders);

export default router;
