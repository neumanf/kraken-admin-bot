import { Bot, Composer, Context } from "grammy";
import { getCustomCommandsFromDB, updateCustomCommand } from "../core/db/customCommand";

import { ExtendedContext } from "../core/bot/context";
import { STOP_ICON } from "../utils/consts";
import { ICommand } from "src/interfaces/command";
import newChatMembers from "./newChatMembers";

async function handleCustomCommands(ctx: Context) {
    const customCommands = await getCustomCommandsFromDB(Number(ctx?.message?.chat?.id));
    const commandsList = new RegExp(`^\/(${customCommands.map((command: ICommand) => command.name).join("|")})$`);
    const composer = new Composer();

    composer.hears(commandsList, async (ctx: Context) => {
        if (ctx.message?.text?.[0] === "/") {
            for (let i = 0; i < customCommands.length; i++) {
                try {
                    if (customCommands[i].name === ctx.message?.text?.slice(1)) {
                        if (customCommands[i].counter >= 0) {
                            await ctx.reply(customCommands[i].value.replace("$COUNTER", `${customCommands[i].counter + 1}`));

                            await updateCustomCommand(customCommands[i].name, customCommands[i].counter);
                        } else {
                            await ctx.reply(customCommands[i].value);
                        }
                    }
                } catch (e) {
                    console.error(e);
                    await ctx.reply(`${STOP_ICON} Error: Could not send command.`);
                }
            }
        }
    });

    return composer;
}

const events = (bot: Bot<ExtendedContext>): void => {
    bot.on("message:new_chat_members", newChatMembers);
    bot.lazy(handleCustomCommands);
};

export default events;
