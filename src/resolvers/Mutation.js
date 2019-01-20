const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
  // encrypt password uing bcrypt library
  const password = await bcrypt.hash(args.password, 10);
  // use prisma client instance to store new user in db
  const user = await context.prisma.createUser({ ...args, password });

  // generate json web token
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // rtn the token and the suer (AuthPayload)
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  // use prisma client to retrieve existing user by email
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found');
  }

  // compare password
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // return AuthPayload
  return {
    token,
    user,
  };
}

function post(parent, args, context) {
  const userId = getUserId(context);
  return context.prisma.createVibe({
    img: args.img,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
}

module.exports = {
  signup,
  login,
  post,
};
