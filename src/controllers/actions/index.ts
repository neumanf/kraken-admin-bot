import { Composer } from "grammy";

import { ExtendedContext } from "../../core/bot/context";
import { ActionHandler } from "./action.controller";
import { UnWarnController } from "./unwarn.controller";
import { AdminService } from "../../services/admin.service";
import { UnBanController } from "./unban.controller";

const composer = new Composer<ExtendedContext>();

const isAdmin = composer.filter(async (ctx) => {
    const { status } = await ctx.getAuthor().catch(() => ({ status: "" }));
    return status === "creator" || status === "administrator";
});

const actionHandler = new ActionHandler();

actionHandler.register("unwarn", new UnWarnController(new AdminService()), isAdmin);
actionHandler.register("unban", new UnBanController(new AdminService()), isAdmin);

export default composer;
