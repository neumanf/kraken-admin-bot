import { ISetting } from "src/interfaces/setting";
import Setting from "../../models/setting";

const setSetting = async (_groupId: number, setting: string, value: unknown): Promise<ISetting | null> => {
    try {
        return await Setting.findOneAndUpdate(
            { groupId: _groupId },
            {
                $set: {
                    [setting]: value,
                },
            },
            { upsert: true },
        );
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getSettings = async (_groupId: number): Promise<ISetting | null> => {
    try {
        return await Setting.findOne({ groupId: _groupId });
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { setSetting, getSettings };
