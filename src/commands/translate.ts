import tr from "googletrans";
import { ALERT_ICON } from "../utils/consts";

export const translateText = async (ctx: any): Promise<string | undefined> => {
    if (!ctx!.message!.reply_to_message!.text) return;

    const language = ctx!.match![1] ?? "en";

    try {
        const result = await tr(ctx!.message!.reply_to_message!.text, language);

        ctx.replyWithHTML(
            `💬 <b>Translation</b> [${language.toUpperCase()}]\n\n<i>${
                result.text
            }</i>`
        );
    } catch (e) {
        console.log(e);
        ctx.reply(`${ALERT_ICON} Error while translating.`);
    }
};
