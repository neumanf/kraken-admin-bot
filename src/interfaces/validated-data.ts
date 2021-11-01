import { User } from "@grammyjs/types";

export interface IValidatedData {
    chatId: number;
    messageId: number;
    user: User;
}
