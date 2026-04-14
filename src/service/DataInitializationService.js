import User from "../models/User.js";
import bcrypt from "bcrypt";

class DataInitializationService {
  async initializeAdminUser() {
    const adminEmail = "sikhadas61@gmail.com";
    const adminPassword = "Choicebazz@r333";

    try {
      // Check if an admin user already exists
      const adminExists = await User.findOne({ email: adminEmail });

      if (!adminExists) {
        // Hash the admin password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Create the admin user
        const adminUser = new User({
          fullName: "ChoiceBazaar",
          email: adminEmail,
          password: hashedPassword,
          role: "ROLE_ADMIN",
        });

        await adminUser.save();
        console.log("Admin user created successfully!");
      } else {
        console.log("Admin user already exists.");
      }
    } catch (error) {
      console.error("Error during admin initialization:", error);
    }
  }
}

export default new DataInitializationService();
