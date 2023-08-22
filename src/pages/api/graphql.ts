import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

// Sample data
const posts = [
  {
    id: '1',
    slug: 'post-1',
    title: 'Sample Post 1',
    categories: ['Category 1'],
    cover: 'cover-url-1',
    date: '2023-08-22',
    published: true,
    lastEditedAt: 1629638400000,
  },
  // ... add more posts
];

interface Post {
  id: string;
  slug: string;
  title: string;
  categories: string[];
  cover: string | null;
  date: string;
  published: boolean;
  lastEditedAt: number;
}

const resolvers = {
  Query: {
    getPost: (parent: any, args: { id: string }) => {
      const { id } = args;
      return posts.find((post: Post) => post.id === id);
    },
    getAllPosts: () => posts,
  },
};

const typeDefs = gql`
  type Post {
    id: ID!
    slug: String!
    title: String!
    categories: [String!]!
    cover: String
    date: String!
    published: Boolean!
    lastEditedAt: Int!
  }

  type Query {
    getPost(id: ID!): Post
    getAllPosts: [Post!]!
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
