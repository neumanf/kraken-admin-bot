import { Composer } from "grammy";
import { StatelessQuestion } from "@grammyjs/stateless-question";
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from "grammy-inline-menu";

import { BaseCommand } from "../../common/base.command";
import { ExtendedContext } from "../../core/bot/context";
import { WelcomeMessageHandler } from "./handlers/welcome.handler";
import { BannedStickerpacksHandler } from "./handlers/banned-stickerpacks.handler";
import { SettingsService } from "./settings.service";

export class SettingsController extends BaseCommand {
    private readonly _composer: Composer<ExtendedContext>;

    constructor(private readonly settingsService: SettingsService) {
        super();

        this._composer = new Composer<ExtendedContext>();
    }

    handle(): void {
        const settingsMenu = new MenuTemplate<ExtendedContext>(() => "⚙️ Settings");
        const welcomeHandler = new WelcomeMessageHandler(this.settingsService);

        const welcomeMessage = new StatelessQuestion("welcome_message", welcomeHandler.handle);
        const welcomeMenu = new MenuTemplate<ExtendedContext>((ctx) => {
            const text =
                "*👋 Welcome message*\n\nYou can use `$NAME`, `$USERNAME` and `$ID` to refer to the user's name, username and id, respectively. Furthermore, if you need to add buttons that leads to URLs, use `$BUTTON{button title; https://your-url.com}`.\ne.g: `Hello, $NAME! Check out my Github repo below. $BUTTON{Github; https://github.com/neumanf/kraken-admin-bot}`\n\nDefine a new welcome message:".replace(
                    /\./g,
                    "\\.",
                );
            return {
                text: text + welcomeMessage.messageSuffixMarkdownV2(),
                parse_mode: "MarkdownV2",
                reply_to_message_id: ctx?.message?.message_id,
                reply_markup: {
                    force_reply: true,
                    selective: true,
                },
            };
        });
        welcomeMenu.manualRow(createBackMainMenuButtons());

        const bannedStickerpacksHandler = new BannedStickerpacksHandler(this.settingsService);
        const bannedStickerpacksMessage = new StatelessQuestion("banned_sticker_packs", bannedStickerpacksHandler.handle);
        const bannedStickerpacksMenu = new MenuTemplate<ExtendedContext>((ctx) => {
            const text =
                "*🚫 Ban stickerpacks*\n\nBan multiple packs at once by separating them by a comma, e.g: `pack_name_1, pack_name_2, pack_name_3`.\n\nDefine banned stickerpacks:".replace(
                    /\./g,
                    "\\.",
                );
            return {
                text: text + bannedStickerpacksMessage.messageSuffixMarkdownV2(),
                parse_mode: "MarkdownV2",
                reply_to_message_id: ctx?.message?.message_id,
                reply_markup: {
                    force_reply: true,
                    selective: true,
                },
            };
        });

        bannedStickerpacksMenu.manualRow(createBackMainMenuButtons());

        settingsMenu.submenu("👋 Welcome message", "welcome_menu", welcomeMenu);
        settingsMenu.submenu("🚫 Banned stickerpacks", "banned_sticker_packs_menu", bannedStickerpacksMenu);

        const settingsMiddleware = new MenuMiddleware("/", settingsMenu);

        this._composer.use(welcomeMessage.middleware());
        this._composer.use(bannedStickerpacksMessage.middleware());
        this._composer.use(settingsMiddleware.middleware());

        this._composer.command("settings", async (ctx) => settingsMiddleware.replyToContext(ctx));
    }

    get composer(): Composer<ExtendedContext> {
        return this._composer;
    }
}
