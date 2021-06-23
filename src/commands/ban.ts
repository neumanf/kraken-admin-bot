import { Markup } from "telegraf";
import TelegrafContext from "telegraf/typings/context";

import { User } from "../interfaces/user";
import { ALERT_ICON, STOP_ICON } from "../utils/consts";

export const banUser = (ctx: TelegrafContext | any, user: User | undefined) => {
    if (ctx?.chat?.type === "private") return;
    if (!user) return;

    const reason = ctx.match[1] === "" ? "Not specified." : ctx.match[1];

    try {
        ctx.deleteMessage(ctx.message?.message_id);
        ctx.deleteMessage(ctx?.message?.reply_to_message.message_id);

        ctx.kickChatMember(user.id);

        ctx.reply(
            `${STOP_ICON} [${user.first_name}](tg://user?id=${user.id}) banned.\nReason: ${reason}`,
            {
                parse_mode: "markdown",
                ...Markup.inlineKeyboard([
                    Markup.button.callback("❌ Cancel", "unban"),
                ]),
            }
        );
    } catch (e) {
        console.log(e);
        ctx.reply(`${ALERT_ICON} Could not ban user.`);
    }
};
