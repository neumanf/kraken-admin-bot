import tr from "googletrans";

import { ExtendedContext } from "../../core/bot/context";
import { ALERT_ICON } from "../../utils/consts";

const translate = async (ctx: ExtendedContext): Promise<void> => {
    if (!ctx?.message?.reply_to_message?.text) return;

    const language: string = ctx?.match?.[1] ?? "en";

    try {
        const result = await tr(ctx?.message?.reply_to_message?.text, language);

        await ctx.replyToMessage(`💬 *Translation* [${language.toUpperCase()}]\n\n_${result.text}_`);
    } catch (e) {
        console.error(e);
        await ctx.replyToMessage(`${ALERT_ICON} Error while translating\.`);
    }
};

export default translate;
