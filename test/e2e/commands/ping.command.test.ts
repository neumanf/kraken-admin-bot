import { Bot } from "grammy";
import TelegramServer from "telegram-test-api";
import { TelegramClient } from "telegram-test-api/lib/modules/telegramClient";

import bootstrap from "../../../src/utils/bootstrap";
import { Database } from "../../../src/core/db";
import { ExtendedContext } from "../../../src/core/bot/context";

describe("PingCommand", () => {
    const token = "token";

    let client: TelegramClient;
    let server: TelegramServer;
    let bot: Bot<ExtendedContext>;

    beforeAll(async () => {
        server = new TelegramServer({ port: 9001 });
        client = server.getClient(token, { timeout: 5000 });
        bot = new Bot(token, {
            ContextConstructor: ExtendedContext,
            client: {
                apiRoot: server.config.apiURL,
                sensitiveLogs: true,
            },
        });

        await server.start();
        bootstrap(bot);
        await Database.connect();
        bot.start();
    });

    afterAll(async () => {
        await Database.disconnect();
        await bot.stop();
        await server.stop();
    });

    it("should reply with 'Pong!'", async () => {
        const command = client.makeCommand("/ping");
        const res = await client.sendCommand(command);

        expect(res.ok).toEqual(true);

        const updates = await client.getUpdates();

        expect(updates.ok).toEqual(true);
        expect(updates.result.length).toEqual(1);
        expect(updates.result[0].message.text).toEqual("Pong!");
    });
});
