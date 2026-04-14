import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";

import adminRouters from "./routers/AdminRouter.js";
import sellerRouters from "./routers/SellerRouters.js";
import authRouters from "./routers/AuthRouters.js";
import userRouteres from "./routers/UserRouters.js";

import productRoutes from "./routers/ProductRoute.js";
import sellerProductRoutes from "../routers/SellerProductRoute.js";
import cartRoutes from "./routers/CartRoute.js";
import orderRoutes from "./routers/OrderRoutes.js";
import sellerOrderRoutes from "../routers/SellerOrderRoutes.js";
import paymentRoutes from "./routers/PaymentRoutes.js";
import transactionRoutes from "./routers/TransactionRoutes.js";
import sellerReportRoutes from "./routers/SellerReportRoutes.js";
import HomeCategoryRoutes from "./routers/HomeCategoryRoutes.js";
import dealRoutes from "./routers/DealRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection caching for serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  cached.conn = await connectDB();
  console.log("MongoDB connected");
  return cached.conn;
}

// Connect DB before every request
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Test route
app.get("/", (req, res) => {
  res.json({
    status: "Backend running successfully 🚀",
  });
});

// Routes
app.use("/auth", authRouters);
app.use("/api/users", userRouteres);
app.use("/sellers", sellerRouters);
app.use("/api/seller/orders", sellerOrderRoutes);

app.use("/products", productRoutes);
app.use("/api/sellers/products", sellerProductRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/payment", paymentRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/sellers/report", sellerReportRoutes);

app.use("/admin", adminRouters);

app.use("/home", HomeCategoryRoutes);
app.use("/admin/deals", dealRoutes);

// Export for Vercel
export default app;
