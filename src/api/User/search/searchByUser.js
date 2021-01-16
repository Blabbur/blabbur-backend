module.exports = {
  Query: {
    searchByUser: (parent, args, ctx) => {
      return ctx.prisma.users({
        where: {
          OR: [
            { email_contains: args.term },
            { handle_contains: args.term },
            { firstname_contains: args.term },
            { lastname: args.term },
          ],
        },
      });
    },
  },
};
