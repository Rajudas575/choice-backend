import mongoose, { Schema } from "mongoose";

const verificationCodeSchema = new Schema({
  otp: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});

const VerificationCode = mongoose.model(
  "VerificationCode",
  verificationCodeSchema,
);

export default VerificationCode;
