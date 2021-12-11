import { ExtendedContext } from "../../../core/bot/context";
import { BaseCommand } from "../../../common/base.command";
import { STOP_ICON } from "../../../utils/consts";
import { ICommand } from "../../../interfaces/command";
import { CustomCommandsService } from "../custom-commands.service";

export class CommandsCommand extends BaseCommand {
    constructor(private readonly customCommandsService: CustomCommandsService) {
        super();
    }

    async handle(ctx: ExtendedContext): Promise<void> {
        const customCommands = await this.customCommandsService.findAll(Number(ctx.message?.chat.id));

        await ctx.replyToMessage(
            customCommands.length === 0
                ? `${STOP_ICON} No commands available\\.`
                : "🤖 *Custom commands*\n\n" + customCommands.map((command: ICommand) => command.name).join(", "),
            {
                parse_mode: "MarkdownV2",
            },
        );
    }
}
