import { ISetting } from "src/interfaces/setting";
import Setting from "../../models/setting";

const setSetting = async (_groupId: number, setting: string, value: unknown): Promise<ISetting | null> => {
    return await Setting.findOneAndUpdate(
        { groupId: _groupId },
        {
            $set: {
                [setting]: value,
            },
        },
        { upsert: true },
    );
};

const getSettings = async (_groupId: number): Promise<ISetting | null> => {
    return await Setting.findOne({ groupId: _groupId });
};

export { setSetting, getSettings };
