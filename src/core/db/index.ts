import mongoose from "mongoose";

export class Database {
    static async connect(): Promise<typeof mongoose> {
        const { NODE_ENV, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
        const url =
            NODE_ENV === "production"
                ? `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
                : `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

        return await mongoose.connect(url);
    }
}
