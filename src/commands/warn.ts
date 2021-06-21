import TelegrafContext from "telegraf/typings/context";
import { getWarns, updateWarns } from "../core/db/warn";
import { User } from "../interfaces/user";
import { ALERT_ICON, INFO_ICON } from "../utils/consts";
import { banUser } from "./ban";

export const warnUser = async (
    ctx: TelegrafContext | any,
    user: User | undefined
) => {
    if (ctx?.chat?.type === "private") return;
    if (!user) return;

    if (ctx.match[1] === "reset") {
        try {
            await updateWarns(user.id, 0);

            ctx.replyWithMarkdown(
                `${INFO_ICON} [${user.first_name}](tg://user?id=${user.id})'s warns have been reseted.`
            );
        } catch (e) {
            ctx.reply(`Error: Could not reset ${user.first_name}'s warns.`);
        }

        return;
    }

    const reason = ctx.match[1] === "" ? "Not specified." : ctx.match[1];

    try {
        const userWarns = (await getWarns(user.id)) + 1;

        await updateWarns(user.id, userWarns);

        ctx.deleteMessage(ctx.message?.message_id);
        ctx.deleteMessage(user.id);

        ctx.replyWithMarkdown(
            `${ALERT_ICON} [${user.first_name}](tg://user?id=${user.id}) has been warned. (${userWarns}/3)\nReason: ${reason}`
        );

        if (userWarns >= 3) {
            banUser(ctx, user);
        }
    } catch (e) {
        console.log(e);
        ctx.reply(`${ALERT_ICON} Could not warn user.`);
    }
};
