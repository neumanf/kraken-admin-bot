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

const composer = new Composer<ExtendedContext>();

const isGroup = composer.filter((ctx) => ["group", "supergroup"].includes(ctx.chat?.type ?? ""));

const isAdmin = composer.filter(async (ctx) => {
    const { status } = await ctx.getAuthor().catch(() => ({ status: "" }));
    return status === "creator" || status === "administrator";
});

const commandHandler = new CommandHandler();

commandHandler.register(["ping"], null, new PingController(), composer);
commandHandler.register(["translate", "tr"], "(\\w+)?", new TranslateController(), composer);
commandHandler.register(["commands"], null, new CustomCommandController(new CustomCommandService()), isGroup);
commandHandler.register(["addcom", "addcommand"], "(\\w+) (.*)", new CustomCommandController(new CustomCommandService()), isAdmin);
commandHandler.register(["delcom", "deletecommand"], "(\\w+)", new CustomCommandController(new CustomCommandService()), isAdmin);
commandHandler.register(["kick"], "(.*)?", new AdminController(new AdminService()), isAdmin);
commandHandler.register(["warn"], "(.*)?", new AdminController(new AdminService()), isAdmin);
commandHandler.register(["ban"], "(.*)?", new AdminController(new AdminService()), isAdmin);

isAdmin.use(new SettingsController(new SettingsService()).composer);

export default composer;
