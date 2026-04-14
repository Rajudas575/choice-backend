import mongoose, { Types } from "mongoose";

const AddressSchema = mongoose.Schema(
  {
    name: { type: String },
    locality: { type: String },
    pincode: { type: String },
    state: { type: String },
    address: { type: String },
    mobile: { type: String },
  },
  { timestamps: true },
);

const Address = mongoose.model("Address", AddressSchema);
export default Address;
