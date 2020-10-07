import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'
import { setContext } from 'apollo-link-context'

const auth = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const link = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const wslink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const splitlink = split(({ query }) => {
  const def = getMainDefinition(query)
  return (
    def.kind === 'OperationDefinition' && def.operation === 'subscription'
  )
}, wslink, auth.concat(link))


const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitlink
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root')
)