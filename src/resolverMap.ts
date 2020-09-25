import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client/core';
import { IResolvers } from 'graphql-tools';
import fetch from 'cross-fetch';
const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 Hello world! 👋`;
    },

    async publicGitHubUserRepositories(source: void, args: any): Promise<string[]> {
      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
          uri: "https://api.github.com/graphql",
          fetch
        }),
        headers: {
          authorization: `Bearer 7f17b36d93f45b379b14527a6c7974175dd88a90`
        }
      });

      const result = await client.query({
        query: gql`
          query repositories(
            $username: String!
          ) {
            repositoryOwner(login: $username) {
              repositories(first: 10) {
                nodes {
                  name
                }
              }
            }
          }
        `,
        variables: {
          username: args.name
        }
      });

      return result.data.repositoryOwner.repositories.nodes.map((node: {name: string}) => node.name);
    },
  },
};

export default resolverMap;