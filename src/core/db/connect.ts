import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
    try {
        await mongoose.connect(String(process.env.MONGO_URI));
        console.log("[DB] Connected successfully.");
    } catch (e) {
        console.error("[DB] Error:", e);
    }
};

export default connectToDB;
