function postedBy(parent, args, context) {
  return context.prisma.vibe({ id: parent.id }).postedBy();
}

module.exports = {
  postedBy,
};
