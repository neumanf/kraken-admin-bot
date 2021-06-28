import { Telegraf } from "telegraf/typings/telegraf";

import { Composer } from "telegraf";
import {
    getCustomCommandsFromDB,
    updateCustomCommand,
} from "../core/db/custom_commands";
import { STOP_ICON } from "../utils/consts";
import { ExtendedContext } from "../core/bot/context";
import { filterNewMembers } from "./filter_new_member";

export const setupEvents = (bot: Telegraf<ExtendedContext>) => {
    bot.on("new_chat_members", (ctx) => filterNewMembers(ctx));

    bot.on(
        "text",
        Composer.lazy(async (ctx: any) => {
            const customCommands = await getCustomCommandsFromDB(
                ctx.message.chat.id
            );

            const commandsList = new RegExp(
                `^\/(${customCommands
                    .map((command: any) => command.name)
                    .join("|")})$`,
                "gm"
            );

            return Composer.hears(commandsList, async (ctx: any) => {
                for (let i = 0; i < customCommands.length; i++) {
                    try {
                        if (customCommands[i].name == ctx.match![1]) {
                            if (customCommands[i].counter >= 0) {
                                ctx.replyToMessage(
                                    customCommands[i].value.replace(
                                        "$COUNTER",
                                        `${customCommands[i].counter + 1}`
                                    )
                                );

                                await updateCustomCommand(
                                    customCommands[i].name,
                                    customCommands[i].counter
                                );
                            } else {
                                ctx.replyToMessage(customCommands[i].value);
                            }
                        }
                    } catch (e) {
                        console.log(e);
                        ctx.replyToMessage(
                            `${STOP_ICON} Error: Could not send command.`
                        );
                    }
                }
            });
        })
    );
};
