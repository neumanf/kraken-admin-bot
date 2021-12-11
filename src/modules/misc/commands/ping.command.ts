import { ExtendedContext } from "../../../core/bot/context";
import { BaseCommand } from "../../../common/base.command";

export class PingCommand extends BaseCommand {
    async handle(ctx: ExtendedContext): Promise<void> {
        await ctx.replyToMessage("Pong!");
    }
}
