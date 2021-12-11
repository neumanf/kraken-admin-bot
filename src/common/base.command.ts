import { ExtendedContext } from "../core/bot/context";

export abstract class BaseCommand {
    abstract handle(ctx: ExtendedContext): void | Promise<void>;
}
