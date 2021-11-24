import { AdminService } from "../../../services/admin.service";
import { IValidatedData } from "../../../interfaces/validated-data";
import { ExtendedContext } from "../../../core/bot/context";
import { ALERT_ICON, INFO_ICON } from "../../../utils/consts";
import { AdminCommand } from "../admin.controller";
import { BanCommand } from "./ban.command";

export class WarnCommand extends AdminCommand {
    constructor(public adminService: AdminService) {
        super();
    }

    private async warn(data: IValidatedData): Promise<number> {
        const userWarns = (await this.adminService.getWarns(data.user.id)) + 1;
        await this.adminService.updateWarns(data.user.id, userWarns);

        return userWarns;
    }

    async handle(ctx: ExtendedContext): Promise<void> {
        const data = this.validate(ctx);
        if (!data) return;

        if (ctx?.match?.[2] === "reset") {
            await this.adminService.updateWarns(data.user.id, 0).catch(async () => {
                await ctx.replyToMessage(`${ALERT_ICON} Could not reset ${data.user.first_name}'s warns\.`);
            });

            await ctx.replyToMessage(`${INFO_ICON} [${data.user.first_name}](tg://user?id=${data.user.id})'s warns have been reseted\\.`, {
                parse_mode: "MarkdownV2",
            });

            return;
        }

        const warns = await this.warn(data).catch(async () => {
            await ctx.reply(`${ALERT_ICON} Could not warn user\.`);
        });

        await this.deleteMessages(ctx, data);
        await this.sendReply(ctx, data.user, "warn", true);

        if (warns >= 3) {
            await BanCommand.ban(ctx, data.user.id);
            await this.sendReply(ctx, data.user, "ban", true);
            await this.adminService.updateWarns(data.user.id, 0);
        }
    }
}
