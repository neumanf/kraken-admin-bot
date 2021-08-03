import { IUpdateOne } from "../../interfaces/updateOne";
import User from "../../models/user";

export const getWarns = async (_id: number): Promise<number> => {
    const user = await User.findOne({
        id: _id,
    });

    return user?.warns ? user.warns : 0;
};

export const updateWarns = async (_id: number, value: number): Promise<IUpdateOne> => {
    return await User.updateOne({ id: _id }, { $set: { warns: value } }, { upsert: true });
};
