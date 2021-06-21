import { MongoClient, Db } from "mongodb";

let cachedDB: Db | null = null;

export async function connectToDB() {
    if (cachedDB) return cachedDB;

    const client = await MongoClient.connect(process.env.MONGO_URI as string, {
        useUnifiedTopology: true,
    });
    const db = client.db(process.env.DB_NAME);

    cachedDB = db;

    return db;
}
