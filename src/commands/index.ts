import { Composer } from "grammy";
import { ExtendedContext } from "../core/bot/context";

import translate from "./translate";
import ban from "./ban";
import warn from "./warn";
import kick from "./kick";
import { addCustomCommand, deleteCustomCommand, getCustomCommands } from "./customCommands";
import setwelcome from "./setWelcome";
import setBannedStickerpacks from "./setBannedStickerpacks";

const composer = new Composer<ExtendedContext>();

const isGroup = composer.filter((ctx) => ["group", "supergroup"].includes(ctx.chat?.type as string));

const isAdmin = composer.filter(async (ctx) => {
    const user = await ctx.getAuthor();
    return user.status === "creator" || user.status === "administrator";
});

composer.command("ping", (ctx) => ctx.replyToMessage("Pong!"));

composer.hears(/^\/translate\s?(\w+)?/, translate);

isAdmin.hears(/^\/ban\s?(.*)$/, (ctx) => ban(ctx, ctx?.message?.reply_to_message?.from));

isAdmin.hears(/^\/warn\s?(.*)$/, (ctx) => warn(ctx, ctx?.message?.reply_to_message?.from));

isAdmin.hears(/^\/kick\s?(.*)$/, (ctx) => kick(ctx, ctx?.message?.reply_to_message?.from));

isAdmin.hears(/^\/setwelcome (.*)/gms, setwelcome);

isAdmin.hears(/^\/setbannedstickerpacks (.*)/gms, setBannedStickerpacks);

isAdmin.hears(/^\/addcom (\w+) (.*)/gms, addCustomCommand);

isAdmin.hears(/^\/delcom (\w+)/, deleteCustomCommand);

isGroup.command("commands", getCustomCommands);

export default composer;
