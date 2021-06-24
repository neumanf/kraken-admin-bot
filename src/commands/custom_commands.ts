import {
    addCommandToDB,
    deleteCommandFromDB,
    getCustomCommandsFromDB,
} from "../core/db/custom_commands";
import { STOP_ICON, SUCCESS_ICON } from "../utils/consts";

const addCustomCommand = async (ctx: any) => {
    if (ctx?.chat?.type === "private") return;

    try {
        await addCommandToDB(
            ctx?.match![1],
            ctx?.match![2],
            ctx.message?.chat.id as number
        );

        ctx.reply(`${SUCCESS_ICON} "${ctx?.match![1]}" command added.`);
    } catch (e) {
        console.log(e);
        ctx.reply(`${STOP_ICON} Error: Command not added.`);
    }
};

const deleteCustomCommand = async (ctx: any) => {
    if (ctx?.chat?.type === "private") return;

    try {
        await deleteCommandFromDB(
            ctx?.match![1],
            ctx.message?.chat.id as number
        );

        ctx.reply(`${SUCCESS_ICON} "${ctx?.match![1]}" command deleted.`);
    } catch (e) {
        console.log(e);
        ctx.reply(`${STOP_ICON} Error: Command not deleted.`);
    }
};

const getCustomCommands = async (ctx: any) => {
    if (ctx?.chat?.type === "private") return;

    const customCommands = await getCustomCommandsFromDB(
        ctx.message?.chat.id as number
    );

    ctx.replyWithMarkdown(
        customCommands.length === 0
            ? `${STOP_ICON} Não há comandos disponíveis nesse chat.`
            : "🤖 *Custom commands*\n\n" +
                  customCommands.map((command) => command.name).join(", ")
    );
};

export { addCustomCommand, deleteCustomCommand, getCustomCommands };
