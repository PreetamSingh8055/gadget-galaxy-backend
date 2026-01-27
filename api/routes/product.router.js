import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";
import {protect , onlyAdmin} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/", protect, onlyAdmin, upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
