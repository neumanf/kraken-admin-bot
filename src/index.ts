require("dotenv").config();

import actions from "./actions";
import commands from "./commands";
import bot from "./core/bot";
import events from "./events";
import { development, production } from "./utils/launch";

commands(bot);
actions(bot);
events(bot);

process.env.NODE_ENV === "development" ? development(bot) : production(bot);

export {};
