import { Composer } from "grammy";

import { ExtendedContext } from "../core/bot/context";
import { isAdmin } from "../helpers/filters/is-admin.filter";
import { ActionHandler } from "../handlers/action.handler";
import { AdminService } from "./admin/admin.service";
import { UnwarnAction } from "./admin/actions/unwarn.action";
import { UnbanAction } from "./admin/actions/unban.action";

const actions = new Composer<ExtendedContext>();
const actionHandler = new ActionHandler();
const adminService = new AdminService();

const isAdminFilter = actions.filter(isAdmin);

actionHandler.register("unwarn", new UnwarnAction(adminService), isAdminFilter);
actionHandler.register("unban", new UnbanAction(adminService), isAdminFilter);

export default actions;
