import { Composer } from "grammy";
import { ExtendedContext } from "../core/bot/context";

import translate from "./translate";
import ban from "./ban";
import warn from "./warn";
import kick from "./kick";
import settings from "./settings";
import * as customCommands from "./customCommands";

const composer = new Composer<ExtendedContext>();

const isGroup = composer.filter((ctx) => ["group", "supergroup"].includes(ctx.chat?.type as string));

const isAdmin = composer.filter(async (ctx) => {
    try {
        const user = await ctx.getAuthor();
        return user.status === "creator" || user.status === "administrator";
    } catch (error) {
        console.error(error);
    }
    return false;
});

composer.command("ping", (ctx) => ctx.replyToMessage("Pong!"));

composer.hears(/^\/translate\s?(\w+)?/, translate);

isAdmin.hears(/^\/ban\s?(.*)$/, (ctx) => ban(ctx, ctx?.message?.reply_to_message?.from));

isAdmin.hears(/^\/warn\s?(.*)$/, (ctx) => warn(ctx, ctx?.message?.reply_to_message?.from));

isAdmin.hears(/^\/kick\s?(.*)$/, (ctx) => kick(ctx, ctx?.message?.reply_to_message?.from));

isAdmin.hears(/^\/addcom (\w+) (.*)/gms, customCommands.addCustomCommand);

isAdmin.hears(/^\/delcom (\w+)/, customCommands.deleteCustomCommand);

isGroup.command("commands", customCommands.getCustomCommands);

isAdmin.use(settings);

export default composer;
