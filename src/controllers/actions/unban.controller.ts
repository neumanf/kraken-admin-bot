import { User } from "@grammyjs/types";

import { ExtendedContext } from "../../core/bot/context";
import { ActionController } from "./action.controller";
import { AdminService } from "../../services/admin.service";
import { ALERT_ICON, SUCCESS_ICON } from "../../utils/consts";

export class UnBanController extends ActionController {
    constructor(private readonly AdminService: AdminService) {
        super();
    }

    async handle(ctx: ExtendedContext, user: User): Promise<void> {
        if (!user) return;

        try {
            await ctx.unbanChatMember(user.id);

            await ctx.editMessageText(`${SUCCESS_ICON} ${user.first_name} unbanned.`);
        } catch (e) {
            console.error(e);
            await ctx.reply(`${ALERT_ICON} Could not unban user.`);
        }
    }
}
