import { ExtendedContext } from "../../core/bot/context";
import { deleteCommandFromDB } from "../../core/db/customCommand";
import { STOP_ICON, SUCCESS_ICON } from "../../utils/consts";

export const deleteCustomCommand = async (ctx: ExtendedContext): Promise<void> => {
    if (!ctx?.match?.[1]) return;

    try {
        await deleteCommandFromDB(ctx?.match?.[1], Number(ctx.message?.chat.id));

        await ctx.replyToMessage(`${SUCCESS_ICON} "${ctx?.match?.[1]}" command deleted.`);
    } catch (e) {
        console.error(e);
        await ctx.replyToMessage(`${STOP_ICON} Error: Command not deleted.`);
    }
};
