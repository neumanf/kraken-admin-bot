import { getWarns, updateWarns } from "../../core/db/warn";
import { ExtendedContext } from "../../core/bot/context";
import { TelegramUser } from "../../interfaces/telegramUser";
import { ALERT_ICON, INFO_ICON, STOP_ICON, SUCCESS_ICON } from "../../utils/consts";

const unwarn = async (ctx: ExtendedContext, user: TelegramUser): Promise<void | undefined> => {
    if (!user) return;

    try {
        const userWarns = await getWarns(user.id);

        if (userWarns > 0) {
            const updatedWarns = await updateWarns(user.id, userWarns - 1);

            if (updatedWarns) {
                await ctx.editMessageText(`${SUCCESS_ICON} ${user.first_name}'s warn removed.`);
            } else {
                await ctx.reply(`${STOP_ICON} Error while trying to remove the warn.`);
            }
        } else {
            await ctx.reply(`${INFO_ICON} This user has no warns.`);
        }
    } catch (e) {
        console.error(e);
        await ctx.reply(`${ALERT_ICON} Could not unwarn user.`);
    }
};

export default unwarn;
