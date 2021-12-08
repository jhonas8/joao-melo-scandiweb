import { ApolloClient, InMemoryCache } from '@apollo/client'

const ENDPOINT: string = process.env.ENDPOINT || "http://localhost:4000"

export const client = new ApolloClient({
    uri: ENDPOINT,
    cache: new InMemoryCache(),
})