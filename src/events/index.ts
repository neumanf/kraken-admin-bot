import { Bot, Composer } from "grammy";
import { getCustomCommandsFromDB, updateCustomCommand } from "../core/db/customCommand";

import { ExtendedContext } from "../core/bot/context";
import { STOP_ICON } from "../utils/consts";
import { ICommand } from "src/interfaces/command";
import newChatMembers from "./newChatMembers";

const events = (bot: Bot<ExtendedContext>): void => {
    bot.on("message:new_chat_members", newChatMembers);

    // TODO: refactor
    bot.on(
        "message:text",
        bot.lazy(async (ctx: ExtendedContext): Promise<Composer<any>> => {
            const customCommands = await getCustomCommandsFromDB(Number(ctx?.message?.chat?.id));

            const commandsList = new RegExp(`^\/(${customCommands.map((command: ICommand) => command.name).join("|")})$`);

            return bot.hears(commandsList, async (ctx: ExtendedContext) => {
                if (ctx.message?.text?.[0] === "/") {
                    for (let i = 0; i < customCommands.length; i++) {
                        try {
                            if (customCommands[i].name === ctx.message?.text?.slice(1)) {
                                if (customCommands[i].counter >= 0) {
                                    await ctx.replyToMessage(customCommands[i].value.replace("$COUNTER", `${customCommands[i].counter + 1}`));

                                    await updateCustomCommand(customCommands[i].name, customCommands[i].counter);
                                } else {
                                    await ctx.replyToMessage(customCommands[i].value);
                                }
                            }
                        } catch (e) {
                            console.error(e);
                            await ctx.replyToMessage(`${STOP_ICON} Error: Could not send command.`);
                        }
                    }
                }
            });
        }),
    );
};

export default events;
