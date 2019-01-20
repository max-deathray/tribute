function feed(root, args, context) {
  return context.prisma.vibes();
}

module.exports = {
  feed,
};
