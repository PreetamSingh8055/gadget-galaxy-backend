import express from "express";
import { protect, onlyAdmin } from "../../middleware/auth.middleware.js";
import upload from "../../middleware/multer.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/admin/product.controller.js";

const router = express.Router();

router.post(
  "/products",
  protect,
  onlyAdmin,
  upload.single("image"),
  createProduct
);

router.put("/products/:id", protect, onlyAdmin, updateProduct);
router.delete("/products/:id", protect, onlyAdmin, deleteProduct);

export default router;
