import React from 'react';
import { Router, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { useAuth0 } from './react-auth0-spa';
import { setContext } from 'apollo-link-context';
import AuthToken from './AuthToken';
import TodoApp from './TodoApp';
import UserList from './UserList';
import NavBar from './NavBar';
import Profile from './Profile';
import UserProfile from './UserProfile';
import history from './history';
import PrivateRoute from './PrivateRoute';
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
  console.log('id token is ', idToken);

  return (
    <ApolloProvider client={client}>
      <div className='todoapp'>
        <Router history={history}>
          <h1>todos</h1>
          <header className='navheader'>
            <NavBar />
          </header>
          <Switch>
            <PrivateRoute path='/' component={UserList} exact />
            <PrivateRoute path='/u/:username' component={({ match }) => {
              const username = match.params.username;
              return (
                <UserProfile username={username} />
              )
            }} exact />
            <PrivateRoute path='/todos' component={TodoApp} exact />
            <PrivateRoute path='/profile' component={Profile} />
          </Switch>
        </Router>
      </div>

      <AuthToken token={idToken} />
    </ApolloProvider>
  );
};

export default App;
