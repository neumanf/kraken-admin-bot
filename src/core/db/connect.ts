import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
    try {
        const { NODE_ENV, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
        const url =
            NODE_ENV === "development"
                ? `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
                : `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

        await mongoose.connect(url);
        console.log("[DB] Connected successfully.");
    } catch (e) {
        console.error("[DB] Error:", e);
    }
};

export default connectToDB;
