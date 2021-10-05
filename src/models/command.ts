import mongoose from "mongoose";
import { ICommand } from "../interfaces/command";

const { Schema } = mongoose;

const commandSchema = new Schema(
    {
        groupId: {
            type: Number,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        counter: {
            type: Number,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<ICommand>("Command", commandSchema);
