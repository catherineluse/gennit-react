import React from 'react';
import { Router } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { useAuth0 } from './react-auth0-spa';
import { setContext } from 'apollo-link-context';
import history from './history';
import AppWithContext from './AppWithContext';
import './App.css';

const createApolloClient = (token) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
    options: {
      reconnect: true,
    },
  });

  const authLink = setContext((request, { headers }) => {
    // return the header to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'X-Auth-Token': token,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

const App = ({ idToken }) => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  const client = createApolloClient(idToken);


  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <AppWithContext />
      </Router>
    </ApolloProvider >
  );
};

export default App;
