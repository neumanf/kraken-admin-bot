import { Bot } from "grammy";

import { ExtendedContext } from "../core/bot/context";
import newChatMembers from "./newChatMembers";
import handleCustomCommands from "./customCommands";

const events = (bot: Bot<ExtendedContext>): void => {
    bot.on("message:new_chat_members", newChatMembers);
    bot.lazy(handleCustomCommands);
};

export default events;
