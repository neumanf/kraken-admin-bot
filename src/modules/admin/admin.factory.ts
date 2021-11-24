import { ExtendedContext } from "../../core/bot/context";
import { BaseCommand } from "../../common/base.command";
import { AdminService } from "../../services/admin.service";
import { KickCommand } from "./commands/kick.command";
import { WarnCommand } from "./commands/warn.command";
import { BanCommand } from "./commands/ban.command";
import { IValidatedData } from "../../interfaces/validated-data";
import { User } from "@grammyjs/types";
import { STOP_ICON, SUCCESS_ICON } from "../../utils/consts";
import { InlineKeyboard } from "grammy";

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
