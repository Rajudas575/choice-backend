// const { default: mongoose } = require("mongoose");
import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  discount: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HomeCategory",
    required: true,
  },
});

const Deal = mongoose.model("Deal", dealSchema);

export default Deal;
