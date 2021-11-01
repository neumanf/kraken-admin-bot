import { Composer } from "grammy";

import { ExtendedContext } from "../../core/bot/context";

import { CommandHandler } from "./command.controller";
import { CustomCommandController } from "./custom-command.controller";
import { CustomCommandService } from "../../services/custom-command.service";
import { PingController } from "./ping.controller";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "../../services/settings.service";
import { TranslateController } from "./translate.controller";
import { AdminController } from "./admin.controller";
import { AdminService } from "../../services/admin.service";
import { isGroup } from "../../helpers/filters/is-group.filter";
import { isAdmin } from "../../helpers/filters/is-admin.filter";

const composer = new Composer<ExtendedContext>();

const isGroupFilter = composer.filter(isGroup);
const isAdminFilter = composer.filter(isAdmin);

const commandHandler = new CommandHandler();

commandHandler.register(["ping"], null, new PingController(), composer);
commandHandler.register(["translate", "tr"], "(\\w+)?", new TranslateController(), composer);
commandHandler.register(["kick"], "(.*)?", new AdminController(new AdminService()), isAdminFilter);
commandHandler.register(["warn"], "(.*)?", new AdminController(new AdminService()), isAdminFilter);
commandHandler.register(["ban"], "(.*)?", new AdminController(new AdminService()), isAdminFilter);
commandHandler.register(["commands"], null, new CustomCommandController(new CustomCommandService()), isGroupFilter);
commandHandler.register(["addcom", "addcommand"], "(\\w+) (.*)", new CustomCommandController(new CustomCommandService()), isAdminFilter);
commandHandler.register(["delcom", "deletecommand"], "(\\w+)", new CustomCommandController(new CustomCommandService()), isAdminFilter);

isAdminFilter.use(new SettingsController(new SettingsService()).composer);

export default composer;
