import React, { useState } from 'react'
import { Router } from 'react-router-dom'
import { 
  ApolloClient, 
  ApolloProvider, 
  gql 
} from '@apollo/client';
import { useAuth0 } from './Auth0Provider'
import history from './history'
import SideNav from './components/SideNav'
import Main from './components/Main'
import { cache } from './cache';
import './App.scss'
import TopNav from './components/TopNav'

const typeDefs = gql`
  extend type Query {
    showSideNav: Boolean!
  }
`;

const createApolloClient = token => {
  return new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache,
    options: {
      reconnect: true
    },
    headers: {
      'X-Auth-Token': token || '',
    },
    typeDefs
  });
}

const App = ({ idToken }) => {
  const { loading } = useAuth0()
  const [ showSideNav, setShowSideNav ] = useState(true)

  if (loading) {
    return <p>Loading...</p>
  }

  const client = createApolloClient(idToken)

  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div>
          {showSideNav ? (
            <div>
              <TopNav 
                showSideNav={showSideNav}
                setShowSideNav={setShowSideNav}
              />
              <SideNav 
                showSideNav={showSideNav}
                setShowSideNav={setShowSideNav}
              />
              <Main
                showSideNav={showSideNav}
              />
            </div>
          ) : (
            <div>
              <TopNav 
                showSideNav={showSideNav}
                setShowSideNav={setShowSideNav}
              />
              <Main
                showSideNav={showSideNav}
              />
            </div>
          )}
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
