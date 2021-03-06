import { ALERT_ICON, SUCCESS_ICON } from "../../../utils/consts";
import { SettingsService } from "../settings.service";
import { ExtendedContext } from "../../../core/bot/context";

export class WelcomeMessageHandler {
    constructor(private readonly settingsService: SettingsService) {}

    async handle(ctx: ExtendedContext): Promise<void> {
        const message = ctx?.message?.text?.trim() ?? "";
        const chatId = ctx.chat?.id;

        if (message.trim().length === 0) {
            await ctx.reply(`${ALERT_ICON} Message is required`);
            return;
        }

        try {
            if (chatId) {
                await this.settingsService.set(chatId, "welcomeMessage", message);
                await ctx.reply(`${SUCCESS_ICON} Welcome message changed successfully.`);
            }
        } catch (e) {
            console.error(e);
            await ctx.reply(`${ALERT_ICON} An unexpected error occurred, please try again later\.`);
        }
    }
}
