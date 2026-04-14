import bcrypt from "bcrypt";
import Seller from "../models/Seller.js";
import User from "../models/User.js";
import VerificationCode from "../models/verificationCode.js";
import generateOTP from "../util/generateOtp.js";
import sendVerificationEmail from "../util/sendEmail.js";
import Cart from "../models/Cart.js";
import jwtProvider from "../util/jwtProvider.js";
import userService from "./userService.js";

class AuthService {
  async sendLoginOTP(email) {
    const SIGNIN_PREFIX = "signin_";

    if (email.startsWith(SIGNIN_PREFIX)) {
      email = email.substring(SIGNIN_PREFIX.length);
      const seller = await Seller.findOne({ email });
      const user = await User.findOne({ email });

      if (!seller && !user) {
        throw new Error("User not found!");
      }
    }

    const existingVerificationCode = await VerificationCode.findOne({ email });

    if (existingVerificationCode) {
      await VerificationCode.deleteOne({ email });
    }
    const otp = generateOTP();

    const verificationCode = new VerificationCode({ otp, email });
    await verificationCode.save();

    //send email to user
    const subject = "Choise Bazar Login/Signup OTP";
    const body = `Your OTP is ${otp}. Please enter it to complete your login process.`;
    await sendVerificationEmail(email, subject, body);
  }

  async createUser(req) {
    const { email, fullName, otp } = req;

    let user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists with email!");
    }

    const verificationCode = await VerificationCode.findOne({ email });

    if (
      !verificationCode ||
      verificationCode.otp.toString() !== otp.toString()
    ) {
      throw new Error("Invalid OTP");
    }

    // delete OTP after verification
    await VerificationCode.deleteOne({ email });

    user = new User({
      email,
      fullName,
    });

    await user.save();

    const cart = new Cart({ user: user._id });
    await cart.save();

    return jwtProvider.createJwt({ email });
  }

  async signin(req) {
    const { email, otp } = req;
    console.log("EMAIL--", email);
    const user = await User.findOne({ email });

    console.log("user : ", user);

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const verificationCode = await VerificationCode.findOne({ email });

    if (!verificationCode || verificationCode.otp !== otp) {
      throw new Error("Wrong OTP...");
    }

    // const token = jwtProvider.createJwt({ email });
    const token = jwtProvider.createJwt({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    return {
      message: "Login Success",
      jwt: token,
      role: user.role,
    };
  }
}

export default new AuthService();
