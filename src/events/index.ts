import { Composer } from "grammy";
import { ExtendedContext } from "../core/bot/context";

import handleNewChatMembers from "./newChatMembers";
import handleCustomCommands from "./customCommands";
import handleStickers from "./stickers";

const composer = new Composer<ExtendedContext>();

composer.on("message:new_chat_members", handleNewChatMembers);
composer.on("message:sticker", handleStickers);
composer.lazy(handleCustomCommands);

export default composer;
