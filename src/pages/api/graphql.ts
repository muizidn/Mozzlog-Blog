import { readPostsFromDatabase } from '@/services/posts';
import { Post } from '@/types/post';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

const resolvers = {
    Query: {
        getPost: async (parent: any, args: { id: string }) => {
            const { id } = args;
            return await findPostById(id);
        },
        getAllPosts: async () => {
            return await fetchAllPosts();
        },
    },
};

async function findPostById(id: string): Promise<Post | undefined> {
    const posts = await readPostsFromDatabase();
    return posts.find((post: Post) => post.id === id);
}

async function fetchAllPosts(): Promise<Post[]> {
    const posts = await readPostsFromDatabase();
    return posts;
}

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
