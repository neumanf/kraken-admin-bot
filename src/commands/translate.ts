import tr from "googletrans";
import { ALERT_ICON } from "../utils/consts";

export const translateText = async (ctx: any): Promise<string | undefined> => {
    if (!ctx!.message!.reply_to_message!.text) return;

    const language = ctx!.match![1] ?? "en";

    try {
        const result = await tr(ctx!.message!.reply_to_message!.text, language);

        ctx.replyToMessage(
            `💬 *Translation* [${language.toUpperCase()}]\n\n_${result.text}_`
        );
    } catch (e) {
        console.log(e);
        ctx.replyToMessage(`${ALERT_ICON} Error while translating.`);
    }
};
