import { Composer } from "grammy";

import { ExtendedContext } from "../../core/bot/context";
import { EventHandler } from "./event.controller";
import { SettingsService } from "../../services/settings.service";
import { NewChatMemberController } from "./new-chat-member.controller";
import { CustomCommandController } from "./custom-commands.controller";
import { CustomCommandService } from "../../services/custom-command.service";
import { StickerController } from "./sticker.controller";

const composer = new Composer<ExtendedContext>();
const eventHandler = new EventHandler();
const customCommandController = new CustomCommandController(new CustomCommandService());

eventHandler.register("message:new_chat_members", new NewChatMemberController(new SettingsService()), composer);
eventHandler.register("message:sticker", new StickerController(new SettingsService()), composer);

composer.lazy(customCommandController.handle.bind(customCommandController));

export default composer;
