import { Composer, Context } from "grammy";

import { CustomCommandsService } from "../custom-commands.service";
import { ExtendedContext } from "../../../core/bot/context";
import { ICommand } from "../../../interfaces/command";
import { STOP_ICON } from "../../../utils/consts";

export class CustomCommandEvent {
    constructor(private readonly customCommandService: CustomCommandsService) {}

    async handle(ctx: ExtendedContext): Promise<Composer<Context>> {
        const composer = new Composer();

        const chatId = ctx?.message?.chat?.id;
        if (!chatId) return composer;

        const customCommands = await this.customCommandService.findAll(chatId);
        const commandsList = new RegExp(`^\/(${customCommands.map((command: ICommand) => command.name).join("|")})$`);

        composer.hears(commandsList, async (ctx: Context) => {
            if (ctx.message?.text?.[0] === "/") {
                for (let i = 0; i < customCommands.length; i++) {
                    try {
                        if (customCommands[i].name === ctx.message?.text?.slice(1)) {
                            if (customCommands[i].counter >= 0) {
                                await ctx.reply(customCommands[i].value.replace("$COUNTER", `${customCommands[i].counter + 1}`));

                                await this.customCommandService.updateCounter(customCommands[i].name, customCommands[i].counter);
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
}
