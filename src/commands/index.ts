import { Markup } from "telegraf";
import Context from "telegraf/typings/context";
import { Update } from "telegraf/typings/core/types/typegram";
import { Telegraf } from "telegraf/typings/telegraf";
import { isAdmin } from "../middlewares/admin";
import { banUser } from "./ban";
import { kickUser } from "./kick";
import { translateText } from "./translate";
import { warnUser } from "./warn";

export const setupCommands = (bot: Telegraf<Context<Update>>) => {
    bot.command("ping", isAdmin, (ctx) => ctx.reply("Pong!"));

    bot.hears(/^\/warn\s?(.*)$/, isAdmin, (ctx) =>
        warnUser(ctx, ctx?.message?.reply_to_message?.from)
    );

    bot.hears(/^\/ban\s?(.*)$/, isAdmin, (ctx) =>
        banUser(ctx, ctx?.message?.reply_to_message?.from)
    );

    bot.hears(/^\/kick\s?(.*)$/, isAdmin, (ctx) =>
        kickUser(ctx, ctx?.message?.reply_to_message?.from)
    );

    bot.hears(/\/translate\s?(\w+)?/, async (ctx) => await translateText(ctx));
};
