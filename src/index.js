import express from "express";
import cors from "cors";
import connectDB from "../src/config/db/db.js";

import adminRouters from "../src/routers/AdminRouter.js";
import sellerRouters from "../src/routers/SellerRouters.js";
import authRouters from "../src/routers/AuthRouters.js";
import userRouteres from "../src/routers/UserRouters.js";

import productRoutes from "../src/routers/ProductRoute.js";
import sellerProductRoutes from "../src/routers/SellerProductRoute.js";
import cartRoutes from "../src/routers/CartRoute.js";
import orderRoutes from "../src/routers/OrderRoutes.js";
import sellerOrderRoutes from "../src/routers/SellerOrderRoutes.js";
import paymentRoutes from "../src/routers/PaymentRoutes.js";
import transactionRoutes from "../src/routers/TransactionRoutes.js";
import sellerReportRoutes from "../src/routers/SellerReportRoutes.js";
import HomeCategoryRoutes from "../src/routers/HomeCategoryRoutes.js";
import dealRoutes from "../src/routers/DealRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection caching for serverless
let cached = global.mongoose || { conn: null };
global.mongoose = cached;

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  cached.conn = await connectDB();
  console.log("MongoDB connected");
  return cached.conn;
}

// Connect DB before every request
await connectToDatabase();

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
