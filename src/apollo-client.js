import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://worthy-bullfrog-34.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": import.meta.env.VITE_HASURA_ADMIN_SECRET,
  },
});

export default client;
