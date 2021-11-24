if (process.env.NODE_ENV !== "production") require("dotenv").config();

import bot from "./core/bot";
import { Launch } from "./utils/launch";

import actions from "./modules/actions";
import commands from "./modules/commands";
import events from "./modules/events";

bot.use(commands);
bot.use(actions);
bot.use(events);

const launch = new Launch(bot);
process.env.NODE_ENV === "development" ? launch.development() : launch.production();

export {};
