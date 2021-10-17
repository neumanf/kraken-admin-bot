import { ExtendedContext } from "../../core/bot/context";

export const isGroup = (ctx: ExtendedContext): boolean => {
    const chatType = ctx.chat?.type ?? "";
    return chatType === "group" || chatType === "supergroup";
};
