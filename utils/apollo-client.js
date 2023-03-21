import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";

const httpLink = new HttpLink({ uri: process.env.GRAPHQL_URL });

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
        }
    });
    return forward(operation);
});

export default new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache()
});