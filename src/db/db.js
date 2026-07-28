import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) {
      console.log("✅ MongoDB Already Connected");
      return;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Star-Enterprises",
    });

    isConnected = true;

    console.log("✅ MongoDB Connected Successfully");
    console.log("👉 Database:", conn.connection.name);
    console.log("👉 Host:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;