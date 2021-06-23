export const isAdmin = async (ctx: any, next: () => Promise<void>) => {
    const userId = ctx.message
        ? ctx?.message?.from.id
        : ctx?.update?.callback_query.from.id;

    const member = await ctx.getChatMember(userId);

    if (member.status === "creator" || member.status === "administrator") {
        next();
    }

    return;
};
