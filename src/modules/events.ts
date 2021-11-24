import { Composer } from "grammy";

import { ExtendedContext } from "../core/bot/context";
import { EventHandler } from "../handlers/event.handler";
import { CustomCommandsController } from "./custom-commands/custom-commands.controller";
import { CustomCommandsService } from "./custom-commands/custom-commands.service";
import { SettingsService } from "./settings/settings.service";
import { WelcomeEvent } from "./settings/events/welcome.event";
import { BannedStickerpacksEvent } from "./settings/events/banned-stickerpacks.event";

const events = new Composer<ExtendedContext>();
const eventHandler = new EventHandler();
const customCommandController = new CustomCommandsController(new CustomCommandsService());
const settingsService = new SettingsService();

eventHandler.register("message:new_chat_members", new WelcomeEvent(settingsService), events);
eventHandler.register("message:sticker", new BannedStickerpacksEvent(settingsService), events);

events.lazy(customCommandController.handle.bind(customCommandController));

export default events;
