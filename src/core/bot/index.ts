import { Bot } from "grammy";
import { ExtendedContext } from "./context";

const bot = new Bot(String(process.env.BOT_TOKEN), {
    ContextConstructor: ExtendedContext,
});

export default bot;
