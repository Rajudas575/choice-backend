import mongoose from "mongoose";
import DataInitializationService from "../../service/DataInitializationService.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);

    console.log(`MongoDb Connected: ${conn.connection.host}`);

    await DataInitializationService.initializeAdminUser();

    return conn; // ✅ VERY IMPORTANT
  } catch (error) {
    console.log(`MongoDB Error: ${error}`);
    throw error; // ✅ also important
  }
};

export default connectDB;
