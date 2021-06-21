import { connectToDB } from "./connect";

export const getWarns = async (_id: number) => {
    const db = await connectToDB();
    const user = await db.collection("users").findOne({
        id: _id,
    });

    return user ? user.warns : 0;
};

export const updateWarns = async (_id: number, value: number) => {
    const db = await connectToDB();

    return await db
        .collection("users")
        .updateOne({ id: _id }, { $set: { warns: value } }, { upsert: true });
};
