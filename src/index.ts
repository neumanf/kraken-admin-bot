require("dotenv").config();

import bot from "./core/bot";
import { development, production } from "./utils/launch";

import actions from "./actions";
import commands from "./commands";
import events from "./events";

bot.use(commands);
bot.use(actions);
bot.use(events);

process.env.NODE_ENV === "development" ? development(bot) : production(bot);

export {};
