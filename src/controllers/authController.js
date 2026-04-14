import userRoles from "../domain/UserRole.js";
import authService from "../service/authService.js";

class AuthController {
  async sendLoginOtp(req, res) {
    try {
      const email = req.body.email;

      await authService.sendLoginOTP(email);
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const jwt = await authService.createUser(req.body);

      const authRes = {
        jwt,
        message: "User created successfully",
        role: userRoles.CUSTOMER,
      };

      res.status(200).json(authRes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async signin(req, res) {
    try {
      const authRes = await authService.signin(req.body);
      res.status(200).json(authRes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new AuthController();
