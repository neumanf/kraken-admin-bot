import { Composer, FilterQuery } from "grammy";
import { ExtendedContext } from "../../core/bot/context";

export class EventHandler {
    register(filter: FilterQuery, eventController: EventController, composer: Composer<ExtendedContext>): void {
        composer.on(filter, eventController.handle.bind(eventController));
    }
}

export abstract class EventController {
    abstract handle(ctx: ExtendedContext): Promise<void>;
}
