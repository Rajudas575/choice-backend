import SellerService from "../service/SellerService.js";
import jwtProvider from "../util/jwtProvider.js";

const sellerMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization faild!" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization faild!" });
    }

    const email = jwtProvider.getEmailFromjwt(token);
    const seller = await SellerService.getSellerByEmail(email);
    // console.log("Seller Auth token", seller);
    req.seller = seller;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default sellerMiddleware;
