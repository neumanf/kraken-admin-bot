import { getWarns, updateWarns } from "../../core/db/warn";
import { ExtendedContext } from "../../core/bot/context";
import { TelegramUser } from "../../interfaces/telegramUser";
import { ALERT_ICON, INFO_ICON } from "../../utils/consts";

const unwarn = async (ctx: ExtendedContext, user: TelegramUser): Promise<void | undefined> => {
    if (!user) return;

    try {
        const userWarns = await getWarns(user.id);

        if (userWarns > 0) {
            await updateWarns(user.id, userWarns - 1);

            ctx.reply(`${INFO_ICON} Warn removed.`);
        } else {
            ctx.reply(`${INFO_ICON} This user has no warns.`);
        }
    } catch (e) {
        console.error(e);
        await ctx.reply(`${ALERT_ICON} Could not unwarn user.`);
    }
};

export default unwarn;
