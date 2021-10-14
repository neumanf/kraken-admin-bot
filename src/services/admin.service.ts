import { IUser } from "../interfaces/user";

import User from "../models/user.model";

export class AdminService {
    async getWarns(id: number): Promise<number> {
        const user = await User.findOne({
            id,
        });

        return user?.warns ? user.warns : 0;
    }

    async updateWarns(id: number, value: number): Promise<IUser | null> {
        return await User.findOneAndUpdate({ id }, { $set: { warns: value } }, { upsert: true });
    }
}
