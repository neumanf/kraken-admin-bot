import TelegrafContext from "telegraf/typings/context";

import { User } from "../interfaces/user";
import { ALERT_ICON, STOP_ICON } from "../utils/consts";

export const kickUser = (
    ctx: TelegrafContext | any,
    user: User | undefined
) => {
    if (ctx?.chat?.type === "private") return;
    if (!user) return;

    const reason = ctx.match[1] === "" ? "Not specified." : ctx.match[1];

    try {
        ctx.deleteMessage(ctx.message?.message_id);
        ctx.deleteMessage(ctx?.message?.reply_to_message.message_id);

        ctx.kickChatMember(user.id);
        ctx.unbanChatMember(user.id);

        ctx.replyToMessage(
            `${STOP_ICON} [${user.first_name}](tg://user?id=${user.id}) kicked.\nReason: ${reason}`
        );
    } catch (e) {
        console.log(e);
        ctx.replyToMessage(`${ALERT_ICON} Could not kick user.`);
    }
};
