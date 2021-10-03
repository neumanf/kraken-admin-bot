import { ExtendedContext } from "../../core/bot/context";
import { addCommandToDB } from "../../core/db/customCommand";
import { STOP_ICON, SUCCESS_ICON } from "../../utils/consts";

export const addCustomCommand = async (ctx: ExtendedContext): Promise<void> => {
    if (!ctx?.match?.[1] || !ctx?.match?.[2]) return;

    try {
        await addCommandToDB(ctx?.match?.[1], ctx?.match?.[2], Number(ctx.message?.chat.id));

        await ctx.replyToMessage(`${SUCCESS_ICON} "${ctx?.match?.[1]}" command added.`);
    } catch (e) {
        console.error(e);
        ctx.replyToMessage(`${STOP_ICON} Error: Command not added.`);
    }
};
