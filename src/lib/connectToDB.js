import mongoose from "mongoose";

const databaseUrl ="mongodb+srv://chadiidac:Mp7xDTaZxZut7BNi@tableclerk.f4mas.mongodb.net/?retryWrites=true&w=majority&appName=TableClerk";



async function connectToDB() {
  try {
    if (!databaseUrl) {
      throw new Error("Environment variable MONGODB_URI is not defined.");
    }
    await mongoose.connect(databaseUrl ); // إزالة الخيارات الزائدة
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

export default connectToDB;
