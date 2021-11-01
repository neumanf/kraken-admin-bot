import { Composer } from "grammy";
import { StatelessQuestion } from "@grammyjs/stateless-question";
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from "grammy-inline-menu";

import { ExtendedContext } from "../../core/bot/context";
import { CommandController } from "./command.controller";
import { SettingsService } from "../../services/settings.service";
import { ALERT_ICON, SUCCESS_ICON } from "../../utils/consts";

export class SettingsController extends CommandController {
    private readonly _composer: Composer<ExtendedContext>;

    constructor(private readonly settingsService: SettingsService) {
        super();

        this._composer = new Composer<ExtendedContext>();

        this.setWelcome = this.setWelcome.bind(this);
        this.setBannedStickerpacks = this.setBannedStickerpacks.bind(this);

        this.handle();
    }

    private async setWelcome(ctx: ExtendedContext): Promise<void> {
        const message = ctx?.message?.text?.trim() ?? "";
        const message_id = ctx.message?.reply_to_message?.message_id;
        const chatId = ctx.chat?.id;

        if (message.trim().length === 0) {
            await ctx.reply(`${ALERT_ICON} Message is required`);
            return;
        }

        try {
            if (chatId && message_id) {
                console.log(this);
                await this.settingsService.set(chatId, "welcomeMessage", message);
                await ctx.api.editMessageText(chatId, message_id, `${SUCCESS_ICON} Welcome message changed successfully.`);
            }
        } catch (e) {
            console.error(e);
            await ctx.reply(`${ALERT_ICON} An unexpected error occurred, please try again later\.`);
        }
    }

    private async setBannedStickerpacks(ctx: ExtendedContext): Promise<void> {
        const message = ctx?.message?.text?.trim() ?? "";
        const message_id = ctx.message?.reply_to_message?.message_id;
        const stickerpacks: string[] = message.split(",").map(Function.prototype.call, String.prototype.trim) ?? [];
        const chatId = ctx.chat?.id;

        if (message.trim().length === 0) {
            await ctx.reply(`${ALERT_ICON} Message is required`);
            return;
        }

        try {
            if (chatId && message_id) {
                console.log(this);
                await this.settingsService.set(chatId, "bannedStickerPacks", stickerpacks);
                await ctx.api.editMessageText(chatId, message_id, `${SUCCESS_ICON} Sticker packs banned successfully.`);
            }
        } catch (e) {
            console.error(e);
            await ctx.reply(`${ALERT_ICON} An unexpected error occurred, please try again later\.`);
        }
    }

    handle(): void {
        const settingsMenu = new MenuTemplate<ExtendedContext>(() => "⚙️ Settings");

        const welcomeMessage = new StatelessQuestion("welcome_message", this.setWelcome);
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

        const bannedStickerpacksMessage = new StatelessQuestion("banned_sticker_packs", this.setBannedStickerpacks);
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
