import { ALERT_ICON } from "../../utils/consts";
import { ExtendedContext } from "../../core/bot/context";

const isGroup = async (ctx: ExtendedContext, next: () => Promise<void>): Promise<void> => {
    if (!ctx.chat?.type) return;

    try {
        if (["group", "supergroup"].includes(ctx.chat?.type)) {
            next();
        } else {
            await ctx.reply(`${ALERT_ICON} This command is only available on groups.`);
        }
    } catch (e) {
        console.error(e);
    }
};

export default isGroup;
