import { Markup } from "telegraf";
import { getSettings } from "../core/db/settings";

const filterNewMembers = async (ctx: any) => {
    const settings = await getSettings(ctx.message.chat.id);

    let welcomeMessage = settings["welcome_message"];

    if (!welcomeMessage) return;

    const matchButton = [
        ...welcomeMessage.matchAll(
            /{BUTTON:\s*([^,]+),\s*(https?:\/\/\S*)\s*}/g
        ),
    ];

    for (let member of ctx.message?.new_chat_members) {
        welcomeMessage = welcomeMessage
            .replace(
                /{NAME}/g,
                `[${member.first_name}](tg://user?id=${member.id})`
            )
            .replace(/{USERNAME}/g, `@${member.username}`)
            .replace(/{ID}/g, member.id.toString());

        if (matchButton) {
            welcomeMessage = welcomeMessage.replace(
                /{BUTTON:\s*([^,]+),\s*(https?:\/\/\S*)\s*}/g,
                ""
            );

            ctx.replyWithMarkdown(
                welcomeMessage,
                Markup.inlineKeyboard(
                    matchButton.map((match) =>
                        Markup.button.url(match[1], match[2])
                    ),
                    {
                        wrap: (btn, index, currentRow) =>
                            currentRow.length >= (index + 1) / 2,
                    }
                )
            );
        } else {
            ctx.replyWithMarkdown(welcomeMessage);
        }
    }
};

export { filterNewMembers };
