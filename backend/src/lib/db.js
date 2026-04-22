import mongoose from "mongoose";

const connectToDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("Missing MongoDB connection string. Set MONGODB_URI or MONGO_URI in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log("MongoDB Connected to", conn.connection.host);
  } catch (error) {
    console.log("Something went wrong", error);
    process.exit(1);
  }
};

export default connectToDB;
