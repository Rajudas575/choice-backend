import express from "express";
import connectDB from "./db/db.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Choice Bazaar Backend system!" });
});

app.use(express.json());

import adminRouters from "./routers/AdminRouter.js";
import sellerRouters from "./routers/SellerRouters.js";
import authRouters from "./routers/AuthRouters.js";
import userRouteres from "./routers/UserRouters.js";

import productRoutes from "./routers/ProductRoute.js";
import sellerProductRoutes from "./routers/SellerProductRoute.js";
import cartRoutes from "./routers/CartRoute.js";
import orderRoutes from "./routers/OrderRoutes.js";
import sellerOrderRoutes from "./routers/SellerOrderRoutes.js";
import paymentRoutes from "./routers/PaymentRoutes.js";
import transactionRoutes from "./routers/TransactionRoutes.js";
import sellerReportRoutes from "./routers/SellerReportRoutes.js";
import HomeCategoryRoutes from "./routers/HomeCategoryRoutes.js";
import dealRoutes from "./routers/DealRoutes.js";


//vercel setup
let cachedConnection = null;

async function connectToMongoDB() {
  if (cachedConnection) return cachedConnection;

  cachedConnection = await connectDB();

  console.log("MongoDB connected");
  return cachedConnection;
}

app.use(async (req, res, next) => {
  await connectToMongoDB();
  next();
});

app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});
//vercel setup


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

const PORT = 5000;

// app.listen(PORT, async () => {
//   console.log(`Server is run on port ${PORT}`);
//   await connectDB();
// });
