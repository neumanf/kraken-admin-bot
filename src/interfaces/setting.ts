import mongoose from "mongoose";

export interface ISetting extends mongoose.Document {
    groupId: number;
    welcomeMessage?: string;
    bannedStickerPacks?: string[];
    createdAt: Date;
    modifiedAt: Date;
}
