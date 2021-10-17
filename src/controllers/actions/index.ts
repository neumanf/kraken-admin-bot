import { Composer } from "grammy";

import { ExtendedContext } from "../../core/bot/context";
import { ActionHandler } from "./action.controller";
import { UnWarnController } from "./unwarn.controller";
import { AdminService } from "../../services/admin.service";
import { UnBanController } from "./unban.controller";
import { isAdmin } from "../../helpers/filters/is-admin.filter";

const composer = new Composer<ExtendedContext>();
const actionHandler = new ActionHandler();

const isAdminFilter = composer.filter(isAdmin);

actionHandler.register("unwarn", new UnWarnController(new AdminService()), isAdminFilter);
actionHandler.register("unban", new UnBanController(new AdminService()), isAdminFilter);

export default composer;
