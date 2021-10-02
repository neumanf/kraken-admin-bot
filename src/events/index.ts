import { Bot } from "grammy";

import { ExtendedContext } from "../core/bot/context";
import handleNewChatMembers from "./newChatMembers";
import handleCustomCommands from "./customCommands";
import handleStickers from "./stickers";

const events = (bot: Bot<ExtendedContext>): void => {
    bot.on("message:new_chat_members", handleNewChatMembers);
    bot.on("message:sticker", handleStickers);
    bot.lazy(handleCustomCommands);
};

export default events;
