import mongoose from "mongoose";

export interface ICommand extends mongoose.Document {
    groupId: number;
    name: string;
    counter: number;
    value: string;
    createdAt: Date;
    modifiedAt: Date;
}
