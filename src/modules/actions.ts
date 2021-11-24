import { Composer } from "grammy";

import { ExtendedContext } from "../core/bot/context";
import { ActionHandler } from "../controllers/actions/action.controller";
import { isAdmin } from "../helpers/filters/is-admin.filter";
import { UnWarnController } from "../controllers/actions/unwarn.controller";
import { AdminService } from "../services/admin.service";
import { UnBanController } from "../controllers/actions/unban.controller";

const actions = new Composer<ExtendedContext>();
const actionHandler = new ActionHandler();
const adminService = new AdminService();

const isAdminFilter = actions.filter(isAdmin);

actionHandler.register("unwarn", new UnWarnController(adminService), isAdminFilter);
actionHandler.register("unban", new UnBanController(adminService), isAdminFilter);

export default actions;
