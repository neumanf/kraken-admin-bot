import { ExtendedContext } from "../../../core/bot/context";
import { BaseCommand } from "../../../common/base.command";
import { STOP_ICON, SUCCESS_ICON } from "../../../utils/consts";
import { CustomCommandsService } from "../custom-commands.service";

export class DelComCommand extends BaseCommand {
    constructor(private readonly customCommandsService: CustomCommandsService) {
        super();
    }

    async handle(ctx: ExtendedContext): Promise<void> {
        if (!ctx?.match?.[2]) return;

        try {
            await this.customCommandsService.delete(Number(ctx.message?.chat.id), ctx?.match?.[2]);

            await ctx.replyToMessage(`${SUCCESS_ICON} "${ctx?.match?.[2]}" command deleted.`);
        } catch (e) {
            console.error(e);
            await ctx.replyToMessage(`${STOP_ICON} Error: Command not deleted.`);
        }
    }
}
