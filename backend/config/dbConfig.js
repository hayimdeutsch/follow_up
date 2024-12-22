import mongoose from "mongoose";

export default connectDB = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_MONOGO_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};
