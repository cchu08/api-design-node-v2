import { makeExecutableSchema } from 'graphql-tools';
import { userType, userResolvers } from './resources/user';
import merge from 'lodash.merge';
import { graphqlExpress } from 'apollo-server-express';
import { songResolvers } from './resources/song/song.resolvers';

const baseSchema = `
    schema {
        query: Query
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [
        baseSchema,
        userType
    ],
    resolvers: merge({}, userResolvers, songResolvers)
});

export const graphqlRouter = graphqlExpress((req) => ({
    schema,
    context: {
        req,
        user: req.user
    }
}))

