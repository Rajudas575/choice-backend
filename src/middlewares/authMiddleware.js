import SellerService from "../service/SellerService.js";
import jwtProvider from "../util/jwtProvider.js";
import UserService from "../service/userService.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log("Auth HEader---", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization faild!" });
    }
    const email = jwtProvider.getEmailFromjwt(token);
    // const user = UserService.findByEmail(email);
    const user = await UserService.findUserProfileByJwt(token);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ message: error.message });
  }
};
export default authMiddleware;
