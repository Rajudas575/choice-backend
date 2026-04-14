// const Razorpay = require('razorpay');
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();



const razorpay = new Razorpay({
  key_id: process.env.API_KEY,
  key_secret: "YOUR_KEY_SECRET",
});

export default razorpay;
