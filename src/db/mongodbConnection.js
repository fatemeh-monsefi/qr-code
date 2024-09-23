import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectDb() {
  try {
    mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;
    console.log("data base connected");

    return connection;
  } catch (error) {
    console.log(error, "error connecting to database");
  }
}
