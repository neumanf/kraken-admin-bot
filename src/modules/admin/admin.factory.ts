import { ExtendedContext } from "../../core/bot/context";
import { BaseCommand } from "../../common/base.command";
import { AdminService } from "./admin.service";
import { KickCommand } from "./commands/kick.command";
import { WarnCommand } from "./commands/warn.command";
import { BanCommand } from "./commands/ban.command";

export class AdminCommandFactory {
    constructor(private readonly ctx: ExtendedContext) {
        this.create();
    }

    async create(): Promise<BaseCommand | null> {
        const adminService = new AdminService();

        switch (this.ctx.match?.[1]) {
            case "kick":
                return new KickCommand();
            case "warn":
                return new WarnCommand(adminService);
            case "ban":
                return new BanCommand(adminService);
            default:
                return null;
        }
    }
}
