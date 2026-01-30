import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./api/routes/auth.router.js";
import productRouter from "./api/routes/product.router.js";
import cartRouter from "./api/routes/cart.router.js";
import addressRouter from "./api/routes/address.router.js";
import orderRouter from "./api/routes/order.router.js";

import adminOrderRouter from "./api/routes/admin/order.router.js";
import adminProductRouter from "./api/routes/admin/product.router.js";
import adminUserRouter from "./api/routes/admin/user.router.js";

dotenv.config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* -------------------- CORS (UPDATED FOR LIVE URLs) -------------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local user frontend
      "http://localhost:5174", // local admin panel
      "https://gadget-shop-website.netlify.app", // LIVE USER
      "https://gadget-shop-admin.netlify.app",   // LIVE ADMIN
      "https://gadgets-show.netlify.app"   // new one
    ],
    credentials: true, // 🔥 REQUIRED for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* -------------------- ROUTES -------------------- */

// user routes
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// admin routes
app.use("/api/admin", adminOrderRouter);
app.use("/api/admin", adminProductRouter);
app.use("/api/admin", adminUserRouter);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gadget Galaxy Backend is LIVE 🚀",
  });
});

export default app;
