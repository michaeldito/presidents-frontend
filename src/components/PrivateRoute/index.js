import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      ! loggedIn
        ? <Redirect to='/login' />
        : <Component {...props} />
    )} />
  );
}

export default PrivateRoute;