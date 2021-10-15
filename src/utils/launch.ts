import { Bot, webhookCallback } from "grammy";
import express from "express";

import { ExtendedContext } from "../core/bot/context";
import { Database } from "../core/db";

export class Launch {
    static async production(bot: Bot<ExtendedContext>): Promise<express.Application> {
        await Database.connect();

        const { WEBHOOK_URL, SECRET_PATH, PORT } = process.env;
        const app = express();

        app.use(express.json());
        app.use(`/${SECRET_PATH}`, webhookCallback(bot, "express"));

        app.listen(PORT, async () => {
            await bot.api.setWebhook(`${WEBHOOK_URL}/${SECRET_PATH}`);
            console.log(`[SERVER] Bot starting webhook`);
        });

        return app;
    }

    static async development(bot: Bot<ExtendedContext>): Promise<void> {
        await Database.connect();

        await bot.api.deleteWebhook();
        console.log("[SERVER] Bot starting polling");
        await bot.start();
    }
}
