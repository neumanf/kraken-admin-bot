import { ISetting } from "src/interfaces/setting";
import { IUpdateOne } from "src/interfaces/updateOne";
import Setting from "../../models/setting";

const setSetting = async (_groupId: number, setting: string, value: string | number): Promise<IUpdateOne> => {
    return await Setting.updateOne(
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
