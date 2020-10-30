import React from 'react'
import { Router } from 'react-router-dom'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { useAuth0 } from './Auth0Provider'
import { setContext } from 'apollo-link-context'
import { useSelector } from 'react-redux'
import history from './history'
import SideNav from './components/SideNav'
import Main from './components/Main'
import './App.scss'

const createApolloClient = token => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
    options: {
      reconnect: true
    }
  })

  const authLink = setContext((request, { headers }) => {
    // return the header to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'X-Auth-Token': token
      }
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}

const App = ({ idToken }) => {
  const { loading } = useAuth0()
  const showSideNav = useSelector(state => state.showSideNav)

  if (loading) {
    return <div>Loading...</div>
  }

  const client = createApolloClient(idToken)

  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div>
          {showSideNav ? (
            <div>
              <SideNav />
              <Main />
            </div>
          ) : (
            <div>
              <Main />
            </div>
          )}
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
