require("dotenv").config();

import { GrammyError, HttpError } from "grammy";

import bot from "./core/bot";
import { development, production } from "./utils/launch";

import actions from "./actions";
import commands from "./commands";
import events from "./events";

bot.use(commands);
bot.use(actions);
bot.use(events);

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

process.env.NODE_ENV === "development" ? development(bot) : production(bot);

export {};
