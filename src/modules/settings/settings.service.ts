import { ISetting } from "../../interfaces/setting";
import Setting from "../../models/setting.model";

export class SettingsService {
    async set(groupId: number, setting: string, value: unknown): Promise<ISetting | null> {
        return Setting.findOneAndUpdate(
            { groupId },
            {
                $set: {
                    [setting]: value,
                },
            },
            { upsert: true },
        );
    }

    async get(groupId: number): Promise<ISetting | null> {
        return Setting.findOne({ groupId });
    }
}
