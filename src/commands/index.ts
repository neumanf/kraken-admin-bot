import { Bot } from "grammy";

import isAdmin from "../middlewares/admin";
import { ExtendedContext } from "../core/bot/context";
import translate from "./translate";
import ban from "./ban";
import warn from "./warn";
import kick from "./kick";
import isGroup from "../middlewares/group";
import { addCustomCommand, deleteCustomCommand, getCustomCommands } from "./customCommands";
import setwelcome from "./setWelcome";
import setBannedStickerpacks from "./setBannedStickerpacks";

const commands = (bot: Bot<ExtendedContext>): void => {
    bot.command("ping", (ctx) => ctx.replyToMessage("Pong!"));

    bot.hears(/\/translate\s?(\w+)?/, translate);

    bot.hears(/^\/ban\s?(.*)$/, isGroup, isAdmin, (ctx) => ban(ctx, ctx?.message?.reply_to_message?.from));

    bot.hears(/^\/warn\s?(.*)$/, isGroup, isAdmin, (ctx) => warn(ctx, ctx?.message?.reply_to_message?.from));

    bot.hears(/^\/kick\s?(.*)$/, isGroup, isAdmin, (ctx) => kick(ctx, ctx?.message?.reply_to_message?.from));

    bot.hears(/^\/setwelcome (.*)/gms, isGroup, isAdmin, setwelcome);

    bot.hears(/^\/setbannedstickerpacks (.*)/gms, isGroup, isAdmin, setBannedStickerpacks);

    bot.hears(/\/addcom (\w+) (.*)/gms, isGroup, isAdmin, addCustomCommand);

    bot.hears(/\/delcom (\w+)/, isGroup, isAdmin, deleteCustomCommand);

    bot.command("commands", isGroup, getCustomCommands);
};

export default commands;
