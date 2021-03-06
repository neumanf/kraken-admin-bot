import { BaseEvent } from "../../../common/base.event";
import { ExtendedContext } from "../../../core/bot/context";
import { SettingsService } from "../settings.service";

export class BannedStickerpacksEvent extends BaseEvent {
    constructor(private readonly settingsService: SettingsService) {
        super();
    }

    async handle(ctx: ExtendedContext): Promise<void> {
        const chatId = ctx.message?.chat.id;

        if (!chatId) return;

        try {
            const settings = await this.settingsService.get(chatId);

            if (!settings || !settings.bannedStickerPacks) return;

            const bannedStickerPacks = settings.bannedStickerPacks;

            for (const pack of bannedStickerPacks) {
                if (ctx.message?.sticker?.set_name?.includes(pack)) {
                    await ctx.deleteMessage();
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}
