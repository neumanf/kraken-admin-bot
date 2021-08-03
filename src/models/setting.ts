import mongoose from "mongoose";
import { ISetting } from "src/interfaces/setting";

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
    },
    { timestamps: true },
);

export default mongoose.model<ISetting>("Setting", settingSchema);
