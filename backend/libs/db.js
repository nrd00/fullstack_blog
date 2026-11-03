import mongoose from "mongoose";

const conntectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conntected successfully!");
  } catch (error) {
    console.log("MongoDB connection error!", error);
  }
};

export default conntectDB;
