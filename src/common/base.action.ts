import { User } from "@grammyjs/types";

import { ExtendedContext } from "../core/bot/context";

export abstract class BaseAction {
    abstract handle(ctx: ExtendedContext, user: User): void | Promise<void>;
}
