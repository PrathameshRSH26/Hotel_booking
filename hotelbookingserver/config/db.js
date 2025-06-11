import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log("❌ MongoDB connection error:", error.message);
  }
};

export default connectDB;
