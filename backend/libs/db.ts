import mongoose from "mongoose";

const conntectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB conntected successfully!");
  } catch (error) {
    console.log("MongoDB connection error!", error);
  }
};

export default conntectDB;
