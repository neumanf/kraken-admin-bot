import { Bot } from "grammy";
import connectToDB from "../core/db/connect";
import { ExtendedContext } from "../core/bot/context";

const production = async (bot: Bot<ExtendedContext>): Promise<void> => {
    try {
        await connectToDB();
        await bot.api.setWebhook(`${process.env.VERCEL_URL}/api`);
        console.log(`[SERVER] Bot starting webhook`);
    } catch (e) {
        console.error(e);
    }
};

const development = async (bot: Bot<ExtendedContext>): Promise<void> => {
    try {
        await connectToDB();
        await bot.api.deleteWebhook();
        console.log("[SERVER] Bot starting polling");
        await bot.start();
    } catch (e) {
        console.error(e);
    }
};

export { production, development };
