import { Bot } from "grammy";
import { ExtendedContext } from "../core/bot/context";

import actions from "../modules/actions";
import commands from "../modules/commands";
import events from "../modules/events";

export default function bootstrap(bot: Bot<ExtendedContext>): void {
    bot.use(commands);
    bot.use(actions);
    bot.use(events);
}
