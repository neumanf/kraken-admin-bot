import { SettingsService } from "../settings.service";
import { ExtendedContext } from "../../../core/bot/context";
import { ALERT_ICON, SUCCESS_ICON } from "../../../utils/consts";

export class BannedStickerpacksHandler {
    constructor(private readonly settingsService: SettingsService) {}

    async handle(ctx: ExtendedContext): Promise<void> {
        const message = ctx?.message?.text?.trim() ?? "";
        const stickerpacks: string[] = message.split(",").map(Function.prototype.call, String.prototype.trim) ?? [];
        const chatId = ctx.chat?.id;

        if (message.trim().length === 0) {
            await ctx.reply(`${ALERT_ICON} Message is required`);
            return;
        }

        try {
            // TODO: check if stickerpacks exists?
            if (chatId) {
                await this.settingsService.set(chatId, "bannedStickerPacks", stickerpacks);
                await ctx.reply(`${SUCCESS_ICON} Sticker packs banned successfully.`);
            }
        } catch (e) {
            console.error(e);
            await ctx.reply(`${ALERT_ICON} An unexpected error occurred, please try again later\.`);
        }
    }
}
