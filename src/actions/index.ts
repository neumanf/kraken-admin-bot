import { Composer } from "grammy";

import { ExtendedContext } from "../core/bot/context";
import unban from "./unban";
import unwarn from "./unwarn";

const composer = new Composer<ExtendedContext>();

const isAdmin = composer.filter(async (ctx) => {
    const user = await ctx.getAuthor();
    return user.status === "creator" || user.status === "administrator";
});

isAdmin.callbackQuery("unban", async (ctx) => {
    const entities = ctx.callbackQuery.message?.entities;

    if (entities?.[0].type === "text_mention") {
        return await unban(ctx, entities?.[0]?.user);
    }
});

isAdmin.callbackQuery("unwarn", async (ctx) => {
    const entities = ctx.callbackQuery.message?.entities;

    if (entities?.[0].type === "text_mention") {
        return await unwarn(ctx, entities?.[0]?.user);
    }
});

export default composer;
