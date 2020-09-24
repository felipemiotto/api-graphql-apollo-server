import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';
import { GraphQLSchema } from 'graphql';
import { gql } from 'apollo-server-express';

const typesDir = path.join(__dirname, 'schema');

const typesArray = loadFilesSync(typesDir, {
  extensions: ['graphql', 'gql'],
  recursive: true
});

const typesString = typesArray.join('\n');
const typeDefs = gql`${typesString}`;

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export default schema;