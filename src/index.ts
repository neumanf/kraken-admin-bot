require("dotenv").config({ path: __dirname + "/../.env" });

import express, { Request, Response } from "express";

import { bot } from "./core/bot/bot";
import { setupCommands } from "./commands";
import { setupActions } from "./actions";
import { setupEvents } from "./events";

setupCommands(bot);
setupActions(bot);
setupEvents(bot);

(() => {
    if (process.env.NODE_ENV === "production") {
        bot.telegram.setWebhook(
            `${process.env.DEPLOY_URL}${process.env.SECRET_PATH}`
        );

        const app = express();

        app.use(bot.webhookCallback(process.env.SECRET_PATH as string));
        app.get("/", (req: Request, res: Response) => res.send("Hello world"));
        app.listen(parseInt(process.env.PORT as string), () =>
            console.log(`Bot running on ${process.env.PORT} port.`)
        );
    } else {
        bot.launch();
    }
})();
