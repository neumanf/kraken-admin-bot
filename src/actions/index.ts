import Context from "telegraf/typings/context";
import { Update } from "telegraf/typings/core/types/typegram";
import { Telegraf } from "telegraf/typings/telegraf";
import { isAdmin } from "../middlewares/admin";
import { unbanUser } from "./unban";
import { unwarnUser } from "./unwarn";

export const setupActions = (bot: Telegraf<Context<Update>>) => {
    bot.action(
        "unwarn",
        isAdmin,
        async (ctx: any) =>
            await unwarnUser(
                ctx,
                ctx?.update?.callback_query?.message?.entities![0].user
            )
    );

    bot.action("unban", isAdmin, (ctx: any) =>
        unbanUser(ctx, ctx?.update?.callback_query?.message?.entities![0].user)
    );
};
