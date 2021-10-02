import { ExtendedContext } from "../../core/bot/context";
import { setSetting } from "../../core/db/setting";
import { ALERT_ICON, SUCCESS_ICON } from "../../utils/consts";

const setBannedStickerpacks = async (ctx: ExtendedContext): Promise<void> => {
    const message = ctx?.match?.[1] ?? "";
    const stickerpacks: string[] = message.split(",").map(Function.prototype.call, String.prototype.trim) ?? [];
    const chatId = ctx.chat?.id;
    console.log(stickerpacks);

    if (message.trim().length === 0) {
        await ctx.reply(`${ALERT_ICON} Message is required`);
        return;
    }

    try {
        if (chatId) {
            await setSetting(chatId, "bannedStickerPacks", stickerpacks);

            await ctx.reply(`${SUCCESS_ICON} Sticker packs banned successfully.`);
        }
    } catch (e) {
        console.error(e);
        await ctx.reply(`${ALERT_ICON} An unexpected error occurred, please try again later\.`);
    }
};

export default setBannedStickerpacks;
