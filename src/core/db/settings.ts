import { connectToDB } from "./connect";

const setSetting = async (_groupId: number, setting: string, value: any) => {
    const db = await connectToDB();
    const settings = db.collection("settings");

    return await settings.updateOne(
        { groupId: _groupId },
        {
            $set: {
                [setting]: value,
            },
        },
        { upsert: true }
    );
};

const getSettings = async (_groupId: number) => {
    const db = await connectToDB();
    const settings = db.collection("settings");

    return await settings.findOne({ groupId: _groupId });
};

export { setSetting, getSettings };
