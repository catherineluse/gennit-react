import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '../Auth0Provider';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    } 

    // If you aren't logged in, you get
    // redirected to the Auth0 login page.
    await loginWithRedirect({
      appState: { targetUrl: window.location.pathname },
    });

  }, [loading, isAuthenticated, loginWithRedirect, path]);


  return (
    <Route 
      path={path} 
      render={(props) => {
        isAuthenticated === true ? <Component {...props} /> : null
      }} 
      {...rest}
    />);
};

export default PrivateRoute;
