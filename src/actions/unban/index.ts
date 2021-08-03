import { ExtendedContext } from "../../core/bot/context";
import { TelegramUser } from "../../interfaces/telegramUser";
import { ALERT_ICON, INFO_ICON } from "../../utils/consts";

const unban = async (ctx: ExtendedContext, user: TelegramUser): Promise<void | undefined> => {
    if (!user) return;

    try {
        await ctx.unbanChatMember(user.id);

        await ctx.reply(`${INFO_ICON} User unbanned.`);
    } catch (e) {
        console.error(e);
        await ctx.reply(`${ALERT_ICON} Could not unban user.`);
    }
};

export default unban;
