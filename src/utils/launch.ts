import { Bot, webhookCallback } from "grammy";
import express from "express";

import connectToDB from "../core/db/connect";
import { ExtendedContext } from "../core/bot/context";

const production = async (bot: Bot<ExtendedContext>): Promise<void> => {
    try {
        await connectToDB();

        const { WEBHOOK_URL, SECRET_PATH, PORT } = process.env;
        const app = express();

        app.use(express.json());
        app.use(`/${SECRET_PATH}`, webhookCallback(bot, "express"));

        app.listen(PORT, async () => {
            await bot.api.setWebhook(`${WEBHOOK_URL}/${SECRET_PATH}`);
            console.log(`[SERVER] Bot starting webhook`);
        });
    } catch (e) {
        console.error(e);
    }
};

const development = async (bot: Bot<ExtendedContext>): Promise<void> => {
    try {
        await connectToDB();
        console.log("[SERVER] Bot starting polling");
        await bot.start();
    } catch (e) {
        console.error(e);
    }
};

export { production, development };
