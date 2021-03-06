import { User } from "@grammyjs/types";

import { BaseAction } from "../../../common/base.action";
import { AdminService } from "../../admin/admin.service";
import { ALERT_ICON, INFO_ICON, STOP_ICON, SUCCESS_ICON } from "../../../utils/consts";
import { ExtendedContext } from "../../../core/bot/context";

export class UnwarnAction extends BaseAction {
    constructor(private readonly AdminService: AdminService) {
        super();
    }

    async handle(ctx: ExtendedContext, user: User): Promise<void> {
        if (!user) return;

        try {
            const userWarns = await this.AdminService.getWarns(user.id);

            if (userWarns > 0) {
                const updatedWarns = await this.AdminService.updateWarns(user.id, userWarns - 1);

                if (updatedWarns) {
                    await ctx.editMessageText(`${SUCCESS_ICON} ${user.first_name}'s warn removed.`);
                } else {
                    await ctx.reply(`${STOP_ICON} Error while trying to remove the warn.`);
                }
            } else {
                await ctx.reply(`${INFO_ICON} This user has no warns.`);
            }
        } catch (e) {
            console.error(e);
            await ctx.reply(`${ALERT_ICON} Could not unwarn user.`);
        }
    }
}
