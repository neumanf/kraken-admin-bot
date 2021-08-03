import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    id: number;
    warns?: number;
    createdAt: Date;
    modifiedAt: Date;
}
