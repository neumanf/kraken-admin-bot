import { Composer } from "grammy";
import { Menu } from "@grammyjs/menu";
import { StatelessQuestion } from "@grammyjs/stateless-question";

import { BaseCommand } from "../../common/base.command";
import { ExtendedContext } from "../../core/bot/context";
import { WelcomeMessageHandler } from "./handlers/welcome.handler";
import { BannedStickerpacksHandler } from "./handlers/banned-stickerpacks.handler";
import { SettingsService } from "./settings.service";

export class SettingsController extends BaseCommand {
    constructor(private readonly composer: Composer<ExtendedContext>) {
        super();
    }

    handle(): void {
        const settingsService = new SettingsService();

        const welcomeHandler = new WelcomeMessageHandler(settingsService);
        const welcomeMessage = new StatelessQuestion("welcome_message", welcomeHandler.handle.bind(welcomeHandler));

        const bannedStickerpacksHandler = new BannedStickerpacksHandler(settingsService);
        const bannedStickerpacksMessage = new StatelessQuestion("banned_sticker_packs", bannedStickerpacksHandler.handle.bind(welcomeHandler));

        const settingsMenu = new Menu("settings-menu")
            .text("👋 Welcome message", (ctx) =>
                ctx.reply(
                    "*👋 Welcome message*\n\nYou can use `$NAME`, `$USERNAME` and `$ID` to refer to the user's name, username and id, respectively. Furthermore, if you need to add buttons that leads to URLs, use `$BUTTON{button title; https://your-url.com}`.\ne.g: `Hello, $NAME! Check out my Github repo below. $BUTTON{Github; https://github.com/neumanf/kraken-admin-bot}`\n\nDefine a new welcome message:" +
                        welcomeMessage.messageSuffixMarkdown(),
                    {
                        parse_mode: "Markdown",
                        reply_markup: { force_reply: true },
                    },
                ),
            )
            .row()
            .text("🚫 Banned stickerpacks", (ctx) =>
                ctx.reply(
                    "*🚫 Ban stickerpacks*\n\nBan multiple packs at once by separating them by a comma, e.g: `pack_name_1, pack_name_2, pack_name_3`.\n\nDefine banned stickerpacks:" +
                        bannedStickerpacksMessage.messageSuffixMarkdown(),
                    {
                        parse_mode: "Markdown",
                        reply_markup: { force_reply: true },
                    },
                ),
            );

        this.composer.use(welcomeMessage.middleware());
        this.composer.use(bannedStickerpacksMessage.middleware());
        this.composer.use(settingsMenu);
        this.composer.command("settings", async (ctx) => {
            await ctx.reply("⚙️ Settings", { reply_markup: settingsMenu });
        });
    }
}
