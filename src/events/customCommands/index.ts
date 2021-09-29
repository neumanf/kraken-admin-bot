import { Composer, Context } from "grammy";

import { ICommand } from "../../interfaces/command";
import { STOP_ICON } from "../../utils/consts";
import { getCustomCommandsFromDB, updateCustomCommand } from "../../core/db/customCommand";

const handleCustomCommands = async (ctx: Context): Promise<Composer<Context>> => {
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
};

export default handleCustomCommands;
