import jwt from "jsonwebtoken";

const secretKey =
  "nsfdsfdsfewjiencmndsrjsdsahejr4esdfsdlnvklgir8iinnsdesiiocnvc88sfkksdfs4dsds";

class JwtProvider {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  createJwt(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: "24h" });
  }

  getEmailFromjwt(token) {
    try {
      const decodeToken = jwt.verify(token, this.secretKey);
      return decodeToken.email;
    } catch (error) {
      throw new Error("Invalid token!");
    }
  }

  verifyJwt(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error("Invalid token!");
    }
  }
}

export default new JwtProvider(secretKey);
