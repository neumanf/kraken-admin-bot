import { InlineKeyboard } from "grammy";

import { ExtendedContext } from "../../core/bot/context";
import { SettingsService } from "../../services/settings.service";
import { EventController } from "./event.controller";

export class NewChatMemberController extends EventController {
    constructor(private readonly settingsService: SettingsService) {
        super();
    }

    async handle(ctx: ExtendedContext): Promise<void> {
        const newMembers = ctx.message?.new_chat_members ?? [];
        const chatId = ctx.message?.chat.id;

        if (!chatId) return;

        try {
            const settings = await this.settingsService.get(chatId);

            if (!settings || !settings.welcomeMessage) return;

            const welcomeMessage = settings.welcomeMessage;

            for (const member of newMembers) {
                let parsedWelcomeMessage = welcomeMessage.replace("$NAME", member.first_name).replace("$USERNAME", `@${member.username}`);
                const buttons = [...parsedWelcomeMessage.matchAll(/\$BUTTON{\s*([^;]+);\s*(https?:\/\/\S*)\s*}/gm)];
                const keyboard = new InlineKeyboard();

                for (const button of buttons) {
                    parsedWelcomeMessage = parsedWelcomeMessage.replace(button[0], "");
                    keyboard.url(button[1], button[2]).row();
                }

                await ctx.reply(parsedWelcomeMessage, {
                    reply_markup: keyboard,
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
}
