import { ExtendedContext } from "../../core/bot/context";
import { CommandController } from "./command.controller";

export class PingController extends CommandController {
    async handle(ctx: ExtendedContext): Promise<void> {
        await ctx.replyToMessage("pooong!");
    }
}
