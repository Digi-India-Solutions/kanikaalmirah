import mongoose from "mongoose";

export const connectDB = async () => {
    try {
       const connectDB = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB: ${connectDB.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};