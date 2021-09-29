import { InlineKeyboard } from "grammy";
import { ExtendedContext } from "src/core/bot/context";
import { getWarns, updateWarns } from "../../core/db/warn";
import { TelegramUser } from "../../interfaces/telegramUser";
import { ALERT_ICON, INFO_ICON, SUCCESS_ICON } from "../../utils/consts";

const warn = async (ctx: ExtendedContext, user: TelegramUser | undefined): Promise<void | undefined> => {
    if (!user || !ctx?.chat?.id || !ctx?.message?.reply_to_message?.message_id) return;

    if (ctx?.match?.[1] === "reset") {
        try {
            await updateWarns(user.id, 0);

            await ctx.replyToMessage(`${INFO_ICON} [${user.first_name}](tg://user?id=${user.id})'s warns have been reseted\\.`, {
                parse_mode: "MarkdownV2",
            });
        } catch (e) {
            await ctx.replyToMessage(`Error: Could not reset ${user.first_name}'s warns\.`);
        }

        return;
    }

    const reason = ctx?.match?.[1] === "" ? "Not specified\\." : ctx?.match?.[1];

    try {
        const userWarns = (await getWarns(user.id)) + 1;

        await updateWarns(user.id, userWarns);

        await ctx.api.deleteMessage(ctx?.chat?.id, ctx?.message?.reply_to_message?.message_id);
        await ctx.deleteMessage();

        ctx.reply(`${ALERT_ICON} [${user.first_name}](tg://user?id=${user.id}) has been warned\\. \\(${userWarns}/3\\)\nReason: ${reason}`, {
            parse_mode: "MarkdownV2",
            reply_markup: new InlineKeyboard().text(`${SUCCESS_ICON} Unwarn`, "unwarn"),
        });

        if (userWarns >= 3) {
            await ctx.banChatMember(user.id);
            await updateWarns(user.id, 0);
        }
    } catch (e) {
        console.error(e);
        ctx.reply(`${ALERT_ICON} Could not warn user\.`);
    }
};

export default warn;
