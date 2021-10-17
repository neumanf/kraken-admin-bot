import { ExtendedContext } from "../../core/bot/context";

export const isAdmin = async (ctx: ExtendedContext): Promise<boolean> => {
    const { status } = await ctx.getAuthor().catch(() => ({ status: "" }));
    return status === "creator" || status === "administrator";
};
