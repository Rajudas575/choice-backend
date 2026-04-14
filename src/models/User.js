import mongoose from "mongoose";
import userRoles from "../domain/UserRole.js";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: mongoose.Schema.ObjectId,
    ref: "Address",
  },
  role: {
    type: String,
    enum: [userRoles.CUSTOMER, userRoles.ADMIN],
    default: userRoles.CUSTOMER,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
