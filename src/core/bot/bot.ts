import { Telegraf } from "telegraf";
import { ExtendedContext } from "./context";

export const bot = new Telegraf(process.env.BOT_TOKEN as string, {
    contextType: ExtendedContext,
});
