import { addCommandToDB, deleteCommandFromDB, getCustomCommandsFromDB } from "../../core/db/customCommand";
import { STOP_ICON, SUCCESS_ICON } from "../../utils/consts";
import { ExtendedContext } from "src/core/bot/context";
import { ICommand } from "src/interfaces/command";

const addCustomCommand = async (ctx: ExtendedContext): Promise<void> => {
    if (!ctx?.match?.[1] || !ctx?.match?.[2]) return;

    try {
        await addCommandToDB(ctx?.match?.[1], ctx?.match?.[2], Number(ctx.message?.chat.id));

        await ctx.replyToMessage(`${SUCCESS_ICON} "${ctx?.match?.[1]}" command added.`);
    } catch (e) {
        console.error(e);
        ctx.replyToMessage(`${STOP_ICON} Error: Command not added.`);
    }
};

const deleteCustomCommand = async (ctx: ExtendedContext): Promise<void> => {
    if (!ctx?.match?.[1]) return;

    try {
        await deleteCommandFromDB(ctx?.match?.[1], Number(ctx.message?.chat.id));

        await ctx.replyToMessage(`${SUCCESS_ICON} "${ctx?.match?.[1]}" command deleted.`);
    } catch (e) {
        console.error(e);
        await ctx.replyToMessage(`${STOP_ICON} Error: Command not deleted.`);
    }
};

const getCustomCommands = async (ctx: ExtendedContext): Promise<void> => {
    const customCommands = await getCustomCommandsFromDB(Number(ctx.message?.chat.id));

    await ctx.replyToMessage(
        customCommands.length === 0
            ? `${STOP_ICON} No commands available\\.`
            : "🤖 *Custom commands*\n\n" + customCommands.map((command: ICommand) => command.name).join(", "),
        {
            parse_mode: "MarkdownV2",
        },
    );
};

export { addCustomCommand, deleteCustomCommand, getCustomCommands };
