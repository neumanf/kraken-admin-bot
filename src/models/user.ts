import mongoose from "mongoose";
import { IUser } from "../interfaces/user";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
            required: true,
        },
        warns: {
            type: Number,
            min: 0,
            default: 0,
        },
    },
    { timestamps: true },
);

export default mongoose.model<IUser>("User", userSchema);
