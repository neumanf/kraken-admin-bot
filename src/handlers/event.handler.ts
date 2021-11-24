import { Composer, FilterQuery } from "grammy";

import { ExtendedContext } from "../core/bot/context";
import { EventController } from "../controllers/events/event.controller";

export class EventHandler {
    register(filter: FilterQuery, eventController: EventController, composer: Composer<ExtendedContext>): void {
        composer.on(filter, eventController.handle.bind(eventController));
    }
}
