import { ExtendedContext } from "../../core/bot/context";
import { getSettings } from "../../core/db/setting";

const handleStickers = async (ctx: ExtendedContext): Promise<void> => {
    const chatId = ctx.message?.chat.id;

    if (!chatId) return;

    try {
        const settings = await getSettings(chatId);

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
};

export default handleStickers;
