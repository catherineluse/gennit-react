import React from 'react';
import { Router, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { useAuth0 } from './react-auth0-spa';
import { setContext } from 'apollo-link-context';
import AuthToken from './AuthToken';
import UserList from './UserList';
import CommunityList from './CommunityList';
import Community from './Community';
import TopNav from './TopNav';
import SideNav from './SideNav';
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


  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div>

          <SideNav />

          <div className="main">
            <TopNav />
            <Switch>
              <PrivateRoute path='/' component={CommunityList} exact />
              <PrivateRoute path='/communities' component={CommunityList} exact />
              <PrivateRoute path='/users' component={UserList} exact />
              <PrivateRoute path='/u/:username' component={UserProfile} exact />
              <PrivateRoute path='/c/:url' component={Community} exact />
              <PrivateRoute path='/profile' component={Profile} exact />
            </Switch>
            <div className="container">
              <AuthToken token={idToken} />
            </div>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
