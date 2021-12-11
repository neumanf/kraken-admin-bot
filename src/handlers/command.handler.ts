import { Composer } from "grammy";

import { ExtendedContext } from "../core/bot/context";
import { BaseCommand } from "../common/base.command";

export class CommandHandler {
    register(aliases: string[], params: string | null, commandController: BaseCommand, composer: Composer<ExtendedContext>): void {
        const trigger = new RegExp(`^\/(${aliases.join("|")})${!params ? "" : `\\s?${params}`}$`);
        composer.hears(trigger, commandController.handle.bind(commandController));
    }
}
