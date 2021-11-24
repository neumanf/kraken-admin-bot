import { ExtendedContext } from "../../../core/bot/context";
import { IValidatedData } from "../../../interfaces/validated-data";
import { ALERT_ICON } from "../../../utils/consts";
import { AdminCommand } from "../admin.controller";

export class KickCommand extends AdminCommand {
    constructor() {
        super();
    }

    static async kick(ctx: ExtendedContext, data: IValidatedData): Promise<void> {
        await ctx.banChatMember(data.user.id);
        await ctx.unbanChatMember(data.user.id);
    }

    async handle(ctx: ExtendedContext): Promise<void> {
        const data = this.validate(ctx);
        if (!data) return;

        await this.deleteMessages(ctx, data);

        await KickCommand.kick(ctx, data).catch(async (e) => {
            console.error(e);
            await ctx.reply(`${ALERT_ICON} Could not kick user\.`);
        });

        await this.sendReply(ctx, data.user, "kick", false);
    }
}
