import { Bot, GrammyError, HttpError, webhookCallback } from "grammy";
import express, { NextFunction, Request, Response } from "express";

import { ExtendedContext } from "../core/bot/context";
import { Database } from "../core/db";

export class Launch {
    constructor(private readonly bot: Bot<ExtendedContext>) {}

    async production(): Promise<express.Application> {
        const { WEBHOOK_URL, SECRET_PATH, PORT } = process.env;
        const app = express();

        app.use(express.json());
        app.use(`/${SECRET_PATH}`, webhookCallback(this.bot));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error("Unknown error:", err);
            return res.status(200).send();
        });

        await this.connectToDatabase(() => {
            app.listen(PORT, async () => {
                await this.bot.api.setWebhook(`${WEBHOOK_URL}/${SECRET_PATH}`, {
                    drop_pending_updates: true,
                });
                console.log(`[SERVER] Bot starting webhook`);
            });
        });

        return app;
    }

    async development(): Promise<void> {
        this.bot.catch((err) => {
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

        await this.connectToDatabase(async () => {
            await this.bot.api.deleteWebhook();
            console.log("[SERVER] Bot starting polling");
            await this.bot.start();
        });
    }

    private async connectToDatabase(callback: () => void): Promise<void> {
        await Database.connect()
            .then(async () => {
                console.log("[DB] Connected successfully.");
                callback();
            })
            .catch((e) => console.error("[DB] Error:", e));
    }
}
