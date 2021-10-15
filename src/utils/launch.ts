import { Bot, GrammyError, HttpError, webhookCallback } from "grammy";
import express from "express";

import { ExtendedContext } from "../core/bot/context";
import { Database } from "../core/db";

export class Launch {
    static async production(bot: Bot<ExtendedContext>): Promise<express.Application> {
        const { WEBHOOK_URL, SECRET_PATH, PORT } = process.env;
        const app = express();

        app.use(express.json());
        app.use(`/${SECRET_PATH}`, webhookCallback(bot, "express"));

        app.use((err, req, res, next) => {
            console.error(err);
            next();
        });

        await Database.connect()
            .then(() => {
                console.log("[DB] Connected successfully.");

                app.listen(PORT, async () => {
                    await bot.api.setWebhook(`${WEBHOOK_URL}/${SECRET_PATH}`);
                    console.log(`[SERVER] Bot starting webhook`);
                });
            })
            .catch((e) => console.error("[DB] Error:", e));

        return app;
    }

    static async development(bot: Bot<ExtendedContext>): Promise<void> {
        bot.catch((err) => {
            const ctx = err.ctx;
            console.error(`Error while handling update ${ctx.update.update_id}:`);
            const e = err.error;
            if (e instanceof GrammyError) {
                console.error("Error in request:", e.description);
            } else if (e instanceof HttpError) {
                console.error("Could not contact Telegram:", e);
            } else {
                console.error("Unknown error:", e);
            }
        });

        await bot.api.deleteWebhook();
        await Database.connect()
            .then(async () => {
                console.log("[DB] Connected successfully.");
                console.log("[SERVER] Bot starting polling");
                await bot.start();
            })
            .catch((e) => console.error("[DB] Error:", e));
    }
}
