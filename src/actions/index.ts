import { Bot } from "grammy";
import isAdmin from "../middlewares/admin";

import { ExtendedContext } from "../core/bot/context";
import unban from "./unban";
import unwarn from "./unwarn";

const actions = (bot: Bot<ExtendedContext>): void => {
    bot.callbackQuery("unban", isAdmin, async (ctx) => {
        const entities = ctx.callbackQuery.message?.entities;

        if (entities?.[0].type === "text_mention") {
            return await unban(ctx, entities?.[0]?.user);
        }
    });

    bot.callbackQuery("unwarn", isAdmin, async (ctx) => {
        const entities = ctx.callbackQuery.message?.entities;

        if (entities?.[0].type === "text_mention") {
            return await unwarn(ctx, entities?.[0]?.user);
        }
    });
};

export default actions;
