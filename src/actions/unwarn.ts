import TelegrafContext from "telegraf/typings/context";
import { getWarns, updateWarns } from "../core/db/warn";
import { User } from "../interfaces/user";
import { ALERT_ICON, INFO_ICON } from "../utils/consts";

export const unwarnUser = async (
    ctx: TelegrafContext | any,
    user: User | undefined
) => {
    if (ctx?.chat?.type === "private") return;
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
        console.log(e);
        ctx.reply(`${ALERT_ICON} Could not unwarn user.`);
    }
};
