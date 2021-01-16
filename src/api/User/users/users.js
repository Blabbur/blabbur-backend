module.exports = {
  Query: {
    users: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. only list users whom I am not following and limit to 4
      const following = await ctx.prisma.user({ id: userId }).following();

      const userIds = following.map((user) => user.id);
      let allUsers = await ctx.prisma.users({
        where: {
          id_not_in: userIds.concat([userId]),
        },
      });

      // Shuffle array
      const shuffled = allUsers.sort(() => 0.5 - Math.random());

      // Get sub-array of first n elements after shuffled
      return shuffled.slice(0, 5);
    },
  },
};
