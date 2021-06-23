import TelegrafContext from "telegraf/typings/context";
import { User } from "../interfaces/user";
import { ALERT_ICON, INFO_ICON } from "../utils/consts";

export const unbanUser = (ctx: TelegrafContext, user: User | undefined) => {
    if (ctx?.chat?.type === "private") return;
    if (!user) return;

    try {
        ctx.unbanChatMember(user.id);

        ctx.reply(`${INFO_ICON} User unbanned.`);
    } catch (e) {
        console.log(e);
        ctx.reply(`${ALERT_ICON} Could not unban user.`);
    }
};
