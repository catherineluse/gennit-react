import React from 'react'
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
import { showSideNavVar } from './cache';

const typeDefs = gql`
  extend type Query {
    showSideNav: Boolean!
    communities: [Community]!
    currentCommunity: Community
    currentDiscussion: Discussion
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
    typeDefs,
    resolvers: {},
  });
}

const App = ({ idToken }) => {
  const { loading } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
  }

  const client = createApolloClient(idToken)

  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div>
          {showSideNavVar ? (
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
