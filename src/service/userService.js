import User from "../models/User.js";
import JwtProvider from "../util/jwtProvider.js";

class UserService {
  async findUserProfileByJwt(jwt) {
    const email = JwtProvider.getEmailFromjwt(jwt);
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User does not exist with email ${email}`);
    }
    return user;
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User does not exist with email ${email}`);
    }
    return user;
  }
}

export default new UserService();
