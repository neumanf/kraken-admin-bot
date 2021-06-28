import { setSetting } from "../core/db/settings";
import { STOP_ICON, SUCCESS_ICON } from "../utils/consts";

export const setWelcomeMessage = async (ctx: any) => {
    try {
        await setSetting(
            ctx.message.chat.id,
            "welcome_message",
            ctx?.match![1]
        );

        ctx.replyToMessage(
            `${SUCCESS_ICON} Welcome message has been set successfully.`
        );
    } catch (e) {
        console.log(e);

        ctx.replyToMessage(
            `${STOP_ICON} Error: Could not set welcome message.`
        );
    }
};
