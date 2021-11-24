import { ExtendedContext } from "../../../core/bot/context";
import { BaseCommand } from "../../../common/base.command";
import { STOP_ICON, SUCCESS_ICON } from "../../../utils/consts";
import { CustomCommandsService } from "../custom-commands.service";

export class AddComCommand extends BaseCommand {
    constructor(private readonly customCommandsService: CustomCommandsService) {
        super();
    }

    async handle(ctx: ExtendedContext): Promise<void> {
        if (!ctx?.match?.[2] || !ctx?.match?.[3]) return;

        try {
            await this.customCommandsService.update(Number(ctx.message?.chat.id), ctx?.match?.[2], ctx?.match?.[3]);

            await ctx.replyToMessage(`${SUCCESS_ICON} "${ctx?.match?.[2]}" command added.`);
        } catch (e) {
            console.error(e);
            await ctx.replyToMessage(`${STOP_ICON} Error: Command not added.`);
        }
    }
}
