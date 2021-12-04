import { Composer, FilterQuery } from "grammy";

import { ExtendedContext } from "../core/bot/context";
import { BaseEvent } from "../common/base.event";

export class EventHandler {
    register(filter: FilterQuery, eventController: BaseEvent, composer: Composer<ExtendedContext>): void {
        composer.on(filter, eventController.handle.bind(eventController));
    }
}
