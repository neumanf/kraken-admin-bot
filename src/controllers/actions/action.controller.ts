import { User } from "@grammyjs/types";
import { Composer } from "grammy";

import { ExtendedContext } from "../../core/bot/context";

export class ActionHandler {
    register(action: string, actionController: ActionController, composer: Composer<ExtendedContext>): void {
        composer.callbackQuery(action, async (ctx: ExtendedContext) => {
            const entities = ctx?.callbackQuery?.message?.entities;

            if (entities?.[0].type === "text_mention") {
                return await actionController.handle(ctx, entities?.[0]?.user);
            }
        });
    }
}

export abstract class ActionController {
    abstract handle(ctx: ExtendedContext, user: User): void;
}
