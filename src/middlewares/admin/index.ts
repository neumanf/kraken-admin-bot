import { ExtendedContext } from "../../core/bot/context";

const isAdmin = async (ctx: ExtendedContext, next: () => Promise<void>): Promise<void> => {
    try {
        const userId = ctx.message ? ctx?.message?.from?.id : ctx?.update?.callback_query?.from.id;

        if (!userId) return;

        const member = await ctx.getChatMember(userId);

        if (member.status === "creator" || member.status === "administrator") {
            next();
        }
    } catch (e) {
        console.error(e);
    }
};

export default isAdmin;
