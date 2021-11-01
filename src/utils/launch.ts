import { Bot, GrammyError, HttpError, webhookCallback } from "grammy";
import express, { Request, Response, NextFunction } from "express";

import connectToDB from "../core/db/connect";
import { ExtendedContext } from "../core/bot/context";

const production = async (bot: Bot<ExtendedContext>): Promise<void> => {
    try {
        await connectToDB();

        const { WEBHOOK_URL, SECRET_PATH, PORT } = process.env;
        const app = express();

        app.use(express.json());
        app.use(`/${SECRET_PATH}`, webhookCallback(bot, "express"));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error("Unknown error:", err);
            return res.status(200).send();
        });

        app.listen(PORT, async () => {
            await bot.api.setWebhook(`${WEBHOOK_URL}/${SECRET_PATH}`);
            console.log(`[SERVER] Bot starting webhook`);
        });
    } catch (e) {
        console.error(e);
    }
};

const development = async (bot: Bot<ExtendedContext>): Promise<void> => {
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
