import { Composer } from "grammy";

import { ExtendedContext } from "../core/bot/context";
import { CommandHandler } from "../handlers/command.handler";
import { isGroup } from "../helpers/filters/is-group.filter";
import { isAdmin } from "../helpers/filters/is-admin.filter";
import { AdminService } from "./admin/admin.service";
import { KickCommand } from "./admin/commands/kick.command";
import { WarnCommand } from "./admin/commands/warn.command";
import { BanCommand } from "./admin/commands/ban.command";
import { CommandsCommand } from "./custom-commands/commands/commands.command";
import { CustomCommandsService } from "./custom-commands/custom-commands.service";
import { AddComCommand } from "./custom-commands/commands/addcom.command";
import { DelComCommand } from "./custom-commands/commands/delcom.command";
import { SettingsController } from "./settings/settings.controller";
import { PingCommand } from "./misc/commands/ping.command";
import { TranslateCommand } from "./misc/commands/translate.command";

const commands = new Composer<ExtendedContext>();
const commandHandler = new CommandHandler();

const isGroupFilter = commands.filter(isGroup);
const isAdminFilter = commands.filter(isAdmin);

const settingsController = new SettingsController(isAdminFilter);
const adminService = new AdminService();
const customCommandsService = new CustomCommandsService();

commandHandler.register(["ping"], null, new PingCommand(), commands);
commandHandler.register(["translate", "tr"], "(\\w+)?", new TranslateCommand(), commands);
commandHandler.register(["commands"], null, new CommandsCommand(customCommandsService), isGroupFilter);

commandHandler.register(["kick"], "(.*)?", new KickCommand(), isAdminFilter);
commandHandler.register(["warn"], "(.*)?", new WarnCommand(adminService), isAdminFilter);
commandHandler.register(["ban"], "(.*)?", new BanCommand(adminService), isAdminFilter);
commandHandler.register(["addcom", "addcommand"], "(\\w+) (.*)", new AddComCommand(customCommandsService), isAdminFilter);
commandHandler.register(["delcom", "deletecommand"], "(\\w+)", new DelComCommand(customCommandsService), isAdminFilter);

settingsController.handle();

export default commands;
