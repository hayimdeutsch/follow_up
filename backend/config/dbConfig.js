import mongoose from "mongoose";
import "dotenv/config";

const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : "mongodb://localhost:27017/follow-up-project";

export default async () => {
  try {
    await mongoose.connect(dbURI);
    console.log(`Connected to MongoDB (${process.env.NODE_ENV})`);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};
