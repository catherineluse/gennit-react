import React, { useContext } from 'react';
import { Router, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { useAuth0 } from './react-auth0-spa';
import { setContext } from 'apollo-link-context';
import AuthToken from './AuthToken';
import UserList from './components/UserList';
import CommunityList from './components/CommunityList';
import Community from './components/Community';
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import UserProfile from './components/UserProfile';
import Profile from './components/Profile';
import history from './history';
import PrivateRoute from './PrivateRoute';
import './App.css';
import Context from './context';
import reducer from "./reducer";

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

  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer()


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
              <PrivateRoute path='/profile' component={Profile} exact />
              <PrivateRoute path='/u/:username' component={UserProfile} exact />
              <PrivateRoute path='/c/:url' component={Community} exact />
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
