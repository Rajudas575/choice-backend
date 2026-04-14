import mongoose from "mongoose";
import DataInitializationService from "../../service/DataInitializationService.js";

const url =
  "mongodb+srv://rajudas575_db:jfVKk83EBlb7rASv@zzar.witn8p9.mongodb.net/?appName=choicebazzar";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    DataInitializationService.initializeAdminUser();
    console.log(`MongoDb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Error: ${error}`);
  }
};

export default connectDB;
