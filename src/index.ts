if (process.env.NODE_ENV !== "production") require("dotenv").config();

import bot from "./core/bot";
import { Launch } from "./utils/launch";

import actions from "./controllers/actions";
import commands from "./controllers/commands";
import events from "./controllers/events";

bot.use(commands);
bot.use(actions);
bot.use(events);

process.env.NODE_ENV === "development" ? Launch.development(bot) : Launch.production(bot);

export {};
