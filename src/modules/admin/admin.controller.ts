import { InlineKeyboard } from "grammy";
import { User } from "@grammyjs/types";

import { STOP_ICON, SUCCESS_ICON } from "../../utils/consts";
import { ExtendedContext } from "../../core/bot/context";
import { IValidatedData } from "../../interfaces/validated-data";
import { BaseCommand } from "../../common/base.command";

export abstract class AdminCommand extends BaseCommand {
    protected constructor() {
        super();
    }

    validate(ctx: ExtendedContext): IValidatedData | undefined {
        const chatId = ctx.chat?.id;
        const replyMessage = ctx?.message?.reply_to_message;
        const replyMessageId = replyMessage?.message_id;
        const user = replyMessage?.from;

        if (!user || !chatId || !replyMessageId) return;

        return {
            chatId,
            messageId: replyMessageId,
            user,
        };
    }

    async sendReply(ctx: ExtendedContext, user: User, action: string, hasAction: boolean): Promise<void> {
        const match = ctx?.match?.[2];
        const reason = !match ? "Not specified\\." : match.replace(/([_*\[\]\(\)~`>#+-=|{}.!'])+/gm, "\\$1");

        await ctx.reply(`${STOP_ICON} \\[${action.toUpperCase()}\\] [${user.first_name}](tg://user?id=${user.id})\\.\nReason: ${reason}`, {
            parse_mode: "MarkdownV2",
            reply_markup: hasAction ? new InlineKeyboard().text(`${SUCCESS_ICON} Remove ${action}`, `un${action}`) : undefined,
        });
    }

    async deleteMessages(ctx: ExtendedContext, data: IValidatedData): Promise<void> {
        await ctx.api.deleteMessage(data.chatId, data.messageId);
        await ctx.deleteMessage();
    }
}
