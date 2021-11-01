import { ICommand } from "../../interfaces/command";
import { STOP_ICON, SUCCESS_ICON } from "../../utils/consts";
import { ExtendedContext } from "../../core/bot/context";

import { CommandController } from "./command.controller";
import { CustomCommandService } from "../../services/custom-command.service";

export class CustomCommandController extends CommandController {
    constructor(private readonly customCommandService: CustomCommandService) {
        super();
    }

    async handle(ctx: ExtendedContext): Promise<void> {
        switch (ctx.match?.[1]) {
            case "commands":
                await this.get(ctx);
                break;
            case "addcom":
            case "addcommand":
                await this.add(ctx);
                break;
            case "delcom":
            case "deletecommand":
                await this.delete(ctx);
                break;
            default:
                break;
        }
    }

    private async get(ctx: ExtendedContext): Promise<void> {
        const customCommands = await this.customCommandService.findAll(Number(ctx.message?.chat.id));

        await ctx.replyToMessage(
            customCommands.length === 0
                ? `${STOP_ICON} No commands available\\.`
                : "🤖 *Custom commands*\n\n" + customCommands.map((command: ICommand) => command.name).join(", "),
            {
                parse_mode: "MarkdownV2",
            },
        );
    }

    private async add(ctx: ExtendedContext): Promise<void> {
        console.log(ctx?.match?.[2], ctx?.match?.[3]);

        if (!ctx?.match?.[2] || !ctx?.match?.[3]) return;

        try {
            await this.customCommandService.update(Number(ctx.message?.chat.id), ctx?.match?.[2], ctx?.match?.[3]);

            await ctx.replyToMessage(`${SUCCESS_ICON} "${ctx?.match?.[2]}" command added.`);
        } catch (e) {
            console.error(e);
            ctx.replyToMessage(`${STOP_ICON} Error: Command not added.`);
        }
    }

    private async delete(ctx: ExtendedContext): Promise<void> {
        if (!ctx?.match?.[2]) return;

        try {
            await this.customCommandService.delete(Number(ctx.message?.chat.id), ctx?.match?.[2]);

            await ctx.replyToMessage(`${SUCCESS_ICON} "${ctx?.match?.[2]}" command deleted.`);
        } catch (e) {
            console.error(e);
            await ctx.replyToMessage(`${STOP_ICON} Error: Command not deleted.`);
        }
    }
}
