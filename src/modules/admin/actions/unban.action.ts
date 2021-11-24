import { User } from "@grammyjs/types";

import { BaseAction } from "../../../common/base.action";
import { ExtendedContext } from "../../../core/bot/context";
import { AdminService } from "../admin.service";
import { ALERT_ICON, SUCCESS_ICON } from "../../../utils/consts";

export class UnbanAction extends BaseAction {
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
