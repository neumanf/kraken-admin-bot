import { StatelessQuestion } from "@grammyjs/stateless-question";
import { Composer } from "grammy";
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from "grammy-inline-menu";

import { ExtendedContext } from "../../core/bot/context";

import setBannedStickerpacks from "./bannedStickerpacks";
import setwelcome from "./welcome";

const composer = new Composer<ExtendedContext>();

const settingsMenu = new MenuTemplate<ExtendedContext>(() => "⚙️ Settings");

const welcomeMessage = new StatelessQuestion("welcome_message", setwelcome);
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

const bannedStickerpacksMessage = new StatelessQuestion("banned_sticker_packs", setBannedStickerpacks);
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

composer.use(welcomeMessage.middleware());
composer.use(bannedStickerpacksMessage.middleware());
composer.use(settingsMiddleware.middleware());

composer.command("settings", async (ctx) => settingsMiddleware.replyToContext(ctx));

export default composer;
