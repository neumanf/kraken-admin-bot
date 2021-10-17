import { InlineKeyboard } from "grammy";

import { ALERT_ICON, INFO_ICON, STOP_ICON, SUCCESS_ICON } from "../../utils/consts";
import { ExtendedContext } from "../../core/bot/context";
import { CommandController } from "./command.controller";
import { AdminService } from "../../services/admin.service";
import { IValidatedData } from "../../interfaces/validated-data";
import { User } from "@grammyjs/types";

export class AdminController extends CommandController {
    constructor(private readonly AdminService: AdminService) {
        super();
    }

    async handle(ctx: ExtendedContext): Promise<void> {
        switch (ctx.match?.[1]) {
            case "kick":
                this.handleKick(ctx);
                break;
            case "warn":
                this.handleWarn(ctx);
                break;
            case "ban":
                this.handleBan(ctx);
                break;
            default:
                break;
        }
    }

    private validate(ctx: ExtendedContext): IValidatedData | null {
        const chatId = ctx.chat?.id;
        const replyMessage = ctx?.message?.reply_to_message;
        const replyMessageId = replyMessage?.message_id;
        const user = replyMessage?.from;

        if (!user || !chatId || !replyMessageId) {
            return null;
        }

        return {
            chatId,
            messageId: replyMessageId,
            user,
        };
    }

    private async sendReply(ctx: ExtendedContext, user: User, action: string, hasAction: boolean) {
        const match = ctx?.match?.[2];
        const reason = !match ? "Not specified\\." : match.replace(/([_*\[\]\(\)~`>#+-=|{}.!'])+/gm, "\\$1");

        await ctx.reply(`${STOP_ICON} \\[${action}\\] [${user.first_name}](tg://user?id=${user.id})\\.\nReason: ${reason}`, {
            parse_mode: "MarkdownV2",
            reply_markup: hasAction ? new InlineKeyboard().text(`${SUCCESS_ICON} Remove ${action}`, `un${action}`) : undefined,
        });
    }

    private async kick(ctx: ExtendedContext, data: IValidatedData): Promise<void> {
        await ctx.banChatMember(data.user.id);
        await ctx.unbanChatMember(data.user.id);
    }

    private async handleKick(ctx: ExtendedContext) {
        const data = this.validate(ctx);
        if (!data) return;

        await this.deleteMessages(ctx, data);

        await this.kick(ctx, data).catch(async (e) => {
            console.error(e);
            await ctx.reply(`${ALERT_ICON} Could not kick user\.`);
        });

        await this.sendReply(ctx, data.user, "kick", false);
    }

    private async deleteMessages(ctx: ExtendedContext, data: IValidatedData) {
        await ctx.api.deleteMessage(data.chatId, data.messageId);
        await ctx.deleteMessage();
    }

    private async warn(ctx: ExtendedContext, data: IValidatedData): Promise<number> {
        const userWarns = (await this.AdminService.getWarns(data.user.id)) + 1;
        await this.AdminService.updateWarns(data.user.id, userWarns);

        return userWarns;
    }

    private async handleWarn(ctx: ExtendedContext): Promise<void> {
        const data = this.validate(ctx);
        if (!data) return;

        if (ctx?.match?.[2] === "reset") {
            await this.AdminService.updateWarns(data.user.id, 0).catch(async () => {
                await ctx.replyToMessage(`${ALERT_ICON} Could not reset ${data.user.first_name}'s warns\.`);
            });

            await ctx.replyToMessage(`${INFO_ICON} [${data.user.first_name}](tg://user?id=${data.user.id})'s warns have been reseted\\.`, {
                parse_mode: "MarkdownV2",
            });

            return;
        }

        const warns = await this.warn(ctx, data).catch(async () => {
            await ctx.reply(`${ALERT_ICON} Could not warn user\.`);
        });

        await this.deleteMessages(ctx, data);
        await this.sendReply(ctx, data.user, "warn", true);

        if (warns >= 3) {
            await this.ban(ctx, data.user.id);
            await this.sendReply(ctx, data.user, "ban", true);
            await this.AdminService.updateWarns(data.user.id, 0);
        }
    }

    private async ban(ctx: ExtendedContext, userId: number): Promise<void> {
        await ctx.banChatMember(userId);
    }

    private async handleBan(ctx: ExtendedContext) {
        const data = this.validate(ctx);
        if (!data) return;

        await this.ban(ctx, data.user.id).catch(async (e) => {
            console.error(e);
            await ctx.reply(`${ALERT_ICON} Could not ban user\.`);
        });

        await this.sendReply(ctx, data.user, "ban", true);
    }
}
