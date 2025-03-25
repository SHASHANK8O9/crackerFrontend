import mongoose from "mongoose";
import chalk from "chalk";
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log(" ✅ Already Connected To Mongo DB");
    return;
  }

  try {
    const db = await mongoose.connect(
      process.env.MONGODB_URI || ("" as string)
    );

    connection.isConnected = db.connections?.[0].readyState;
    // console.log(db);
    console.log(chalk.bgGreen("Database  Connected Successfully!!"));

    return;
  } catch (err) {
    console.error("❌ Connection Failed:", err);
    process.exit(1);
  }
}
