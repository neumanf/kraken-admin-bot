import Context from "telegraf/typings/context";
import { Update } from "telegraf/typings/core/types/typegram";
import { Telegraf } from "telegraf/typings/telegraf";

import { Composer } from "telegraf";
import {
    getCustomCommandsFromDB,
    updateCustomCommand,
} from "../core/db/custom_commands";
import { STOP_ICON } from "../utils/consts";

export const setupEvents = (bot: Telegraf<Context<Update>>) => {
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
                                ctx.replyWithMarkdown(
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
                                ctx.replyWithMarkdown(customCommands[i].value);
                            }
                        }
                    } catch (e) {
                        console.log(e);
                        ctx.replyWithMarkdown(
                            `${STOP_ICON} Error: Could not send command.`
                        );
                    }
                }
            });
        })
    );
};
