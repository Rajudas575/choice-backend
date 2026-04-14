import userRoles from "../domain/UserRole.js";
import VerificationCode from "../models/verificationCode.js";
import sellerService from "../service/SellerService.js";
import jwtProvider from "../util/jwtProvider.js";

class SellerController {
  async getSellerProfile(req, res) {
    try {
      const sellerProfile = await req.seller;
      // console.log("Profile", sellerProfile);
      const jwt = req.headers.authorization.split(" ")[1];
      const seller = await sellerService.getSellerProfile(jwt);
      res.status(200).json(seller);
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async createSeller(req, res) {
    try {
      const seller = await sellerService.createSeller(req.body);
      res.status(200).json({ message: "Seller created successuly." });
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async getAllSellers(req, res) {
    try {
      const status = req.query.status;
      // console.log("controller getAllSeller", status);
      const sellers = await sellerService.getAllSellers(status);
      
      res.status(200).json(sellers);
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async updateSeller(req, res) {
    try {
      const existingSeller = await req.seller;
      const seller = await sellerService.updateSeller(existingSeller, req.body);
      res.status(200).json(seller);
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async deleteSeller(req, res) {
    try {
      await sellerService.deleteSeller(req.params.id);
      res.status(200).json({ message: "Seller deleted successfully." });
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async updateSellerAccountStatus(req, res) {
    try {
      const updateSeller = await sellerService.updateSellerStatus(
        req.params.id,
        req.params.status,
      );
      res.status(200).json(updateSeller);
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async verifyLoginOtp(req, res) {
    try {
      const { otp, email } = req.body;
      const seller = await sellerService.getSellerByEmail(email);

      const verificationCode = await VerificationCode.findOne({ email });

      if (!verificationCode || verificationCode.otp != otp) {
        throw new Error("Invalid OTP!");
      }

      const token = jwtProvider.createJwt({ email });

      const authResponse = {
        message: "Login Success",
        jwt: token,
        role: userRoles.SELLER,
      };

      return res.status(200).json(authResponse);
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }
}

export default new SellerController();
