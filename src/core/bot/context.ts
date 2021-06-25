import { Context } from "telegraf";

export class ExtendedContext extends Context {
    constructor(update: any, telegram: any, options: any) {
        super(update, telegram, options);
    }

    replyToMessage(message: string) {
        if (this.message) {
            if (!("text" in this.message)) return;

            return super.replyWithMarkdown(message, {
                reply_to_message_id: this.message!.reply_to_message
                    ? this!.message!.reply_to_message!.message_id
                    : this.message?.message_id,
            });
        }
        return;
    }
}
