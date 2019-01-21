async function feed(root, args, context) {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { img_contains: args.filter },
        ],
      }
    : {};

  const vibes = await context.prisma.vibes({
    where,
  });

  return vibes;
}

module.exports = {
  feed,
};
