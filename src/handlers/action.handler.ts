import { Composer } from "grammy";

import { ActionController } from "../modules/admin/actions/action.controller";
import { ExtendedContext } from "../core/bot/context";

export class ActionHandler {
    register(action: string, actionController: ActionController, composer: Composer<ExtendedContext>): void {
        composer.callbackQuery(action, async (ctx: ExtendedContext) => {
            const entities = ctx?.callbackQuery?.message?.entities;

            if (entities?.[0].type === "text_mention") {
                return actionController.handle(ctx, entities?.[0]?.user);
            }
        });
    }
}
