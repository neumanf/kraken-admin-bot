import User from "../../models/user";
import { IUser } from "../../interfaces/user";

export const getWarns = async (_id: number): Promise<number> => {
    try {
        const user = await User.findOne({
            id: _id,
        });

        return user?.warns ? user.warns : 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

export const updateWarns = async (_id: number, value: number): Promise<IUser | null> => {
    try {
        return await User.findOneAndUpdate({ id: _id }, { $set: { warns: value } }, { upsert: true });
    } catch (error) {
        console.error(error);
        return null;
    }
};
