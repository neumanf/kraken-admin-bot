import { AdminService } from "../admin.service";
import { ExtendedContext } from "../../../core/bot/context";
import { ALERT_ICON } from "../../../utils/consts";
import { AdminCommand } from "../admin.controller";

export class BanCommand extends AdminCommand {
    constructor(public adminService: AdminService) {
        super();
    }

    async handle(ctx: ExtendedContext): Promise<void> {
        const data = this.validate(ctx);
        if (!data) return;

        await BanCommand.ban(ctx, data.user.id).catch(async (e) => {
            console.error(e);
            await ctx.reply(`${ALERT_ICON} Could not ban user\.`);
        });

        await this.sendReply(ctx, data.user, "ban", true);
    }

    static async ban(ctx: ExtendedContext, userId: number): Promise<boolean> {
        return ctx.banChatMember(userId);
    }
}
