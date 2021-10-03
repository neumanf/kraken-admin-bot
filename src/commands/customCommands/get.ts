import { ExtendedContext } from "../../core/bot/context";
import { getCustomCommandsFromDB } from "../../core/db/customCommand";
import { ICommand } from "../../interfaces/command";
import { STOP_ICON } from "../../utils/consts";

export const getCustomCommands = async (ctx: ExtendedContext): Promise<void> => {
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
