import mongoose from "mongoose";
import { ISetting } from "../interfaces/setting";

const { Schema } = mongoose;

const settingSchema = new Schema(
    {
        groupId: {
            type: Number,
            unique: true,
            required: true,
        },
        welcomeMessage: {
            type: String,
            default: "",
        },
        bannedStickerPacks: {
            type: Array,
            of: String,
            default: [],
        },
    },
    { timestamps: true },
);

export default mongoose.model<ISetting>("Setting", settingSchema);
