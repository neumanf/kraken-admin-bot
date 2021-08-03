import { ExtendedContext } from "../../core/bot/context";
import { setSetting } from "../../core/db/setting";
import { ALERT_ICON, SUCCESS_ICON } from "../../utils/consts";

const setwelcome = async (ctx: ExtendedContext): Promise<void> => {
    const message = ctx?.match?.[1] ?? "";
    const chatId = ctx.chat?.id;

    if (message.trim().length === 0) {
        await ctx.reply(`${ALERT_ICON} Message is required`);
        return;
    }

    try {
        if (chatId) {
            await setSetting(chatId, "welcomeMessage", message);

            await ctx.reply(`${SUCCESS_ICON} Welcome message changed successfully.`);
        }
    } catch (e) {
        console.error(e);
        await ctx.reply(`${ALERT_ICON} An unexpected error occurred, please try again later\.`);
    }
};

export default setwelcome;
