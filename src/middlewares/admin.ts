import TelegrafContext from "telegraf/typings/context";

export const isAdmin = async (
    ctx: TelegrafContext,
    next: () => Promise<void>
) => {
    const member = await ctx.getChatMember(ctx?.message?.from.id as number);

    if (member.status === "creator" || member.status === "administrator") {
        next();
    }

    return;
};
