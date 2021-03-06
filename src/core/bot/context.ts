import { Api, Context, RawApi } from "grammy";
import type { Update, UserFromGetMe } from "@grammyjs/types";
import { Message } from "grammy/out/platform.node";
import { Other } from "grammy/out/core/api";
import { Methods } from "grammy/out/core/client";

export class ExtendedContext extends Context {
    constructor(update: Update, api: Api, me: UserFromGetMe) {
        super(update, api, me);
    }

    async replyToMessage(message: string, other?: Other<RawApi, Methods<RawApi>> | undefined): Promise<Message.TextMessage | undefined> {
        if (this.message && this.message.text) {
            return await this.reply(message, {
                ...other,
                reply_to_message_id: this.message.reply_to_message ? this.message.reply_to_message.message_id : this.message.message_id,
            });
        }
        return;
    }

    // async ban(user: User): Promise<true> {
    //     if (this?.chat?.id && this?.message?.reply_to_message?.message_id) {
    //         await this.api.deleteMessage(this?.chat?.id, ctx?.message?.reply_to_message?.message_id);
    //         await this.deleteMessage();
    //     }

    //     return this.banChatMember(user.id);
    // }
}
