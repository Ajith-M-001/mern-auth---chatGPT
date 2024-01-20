// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URI } = process.env;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    throw error;
  }
};

export default connectToDatabase;
