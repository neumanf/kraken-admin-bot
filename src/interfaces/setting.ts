import mongoose from "mongoose";

export interface ISetting extends mongoose.Document {
    groupId: number;
    welcomeMessage?: string;
    createdAt: Date;
    modifiedAt: Date;
}
