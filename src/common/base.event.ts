import { ExtendedContext } from "../core/bot/context";

export abstract class BaseEvent {
    abstract handle(ctx: ExtendedContext): void | Promise<void>;
}
