import mongoose from "mongoose";
const { DB_CONN } = process.env;

const dbConnection = async () => {
  try {
    await mongoose.connect(DB_CONN);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to the database");
  }
};

export default dbConnection;
