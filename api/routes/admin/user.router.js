import express from "express";
import { protect, onlyAdmin } from "../../middleware/auth.middleware.js";
import {
  getAllUsers,
  updateUserRole,
} from "../../controllers/admin/user.controller.js";

const router = express.Router();

// ADMIN: get all users
router.get("/users", protect, onlyAdmin, getAllUsers);

// ADMIN: update user role
router.put("/users/:id/role", protect, onlyAdmin, updateUserRole);

export default router;
