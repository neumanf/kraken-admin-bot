import { Composer } from "grammy";
import { ExtendedContext } from "../../core/bot/context";

export class CommandHandler {
    register(aliases: string[], params: string | null, commandController: CommandController, composer: Composer<ExtendedContext>): void {
        const trigger = new RegExp(`^\/(${aliases.join("|")})${!params ? "" : `\\s?${params}`}$`);
        composer.hears(trigger, commandController.handle.bind(commandController));
    }
}

export abstract class CommandController {
    abstract handle(ctx: ExtendedContext): void;
}
