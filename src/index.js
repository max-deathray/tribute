const { GraphQLServer } = require('graphql-yoga');

let vibes = [
  {
    id: 'vibe-01',
    img:
      'https://i.pinimg.com/564x/6a/9c/69/6a9c69b7e19c56fdd8708a2d2fc95853.jpg',
    description: 'Cali Vibes',
  },
];

const typeDefs = `
type Query {
  info: String!
}

type Vibe {
  id: ID!
  despcription: String!
  img: String!
}
`;

const resolvers = {
  Query: {
    info: () => `This is my GraphQL project!`,
    feed: () => vibes,
  },
  Vibe: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
