import { ExtendedContext } from "src/core/bot/context";
import { TelegramUser } from "../../interfaces/telegramUser";
import { ALERT_ICON, STOP_ICON } from "../../utils/consts";

const kick = async (ctx: ExtendedContext, user: TelegramUser | undefined): Promise<void | undefined> => {
    if (!user || !ctx?.chat?.id || !ctx?.message?.reply_to_message?.message_id) return;

    const reason = ctx?.match?.[1] === "" ? "Not specified\\." : ctx.match?.[1];

    try {
        await ctx.api.deleteMessage(ctx?.chat?.id, ctx?.message?.reply_to_message?.message_id);
        await ctx.deleteMessage();

        await ctx.banChatMember(user.id);
        await ctx.unbanChatMember(user.id);

        await ctx.reply(`${STOP_ICON} [${user.first_name}](tg://user?id=${user.id}) kicked\\.\nReason: ${reason}`, {
            parse_mode: "MarkdownV2",
        });
    } catch (e) {
        console.error(e);
        await ctx.reply(`${ALERT_ICON} Could not kick user\.`);
    }
};

export default kick;
