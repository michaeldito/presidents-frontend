import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, PageHeader } from 'antd';

const PrivateRoute = ({ component: Component, user, allowedRoles, ...rest }) => {
  const doesUserHaveAllowedRole = allowedRoles.find(role => role === user.role);
  console.log(`is user in allowed roles? ${doesUserHaveAllowedRole}`);
  console.log(`is user logged in? ${user.loggedIn}`)

  return (
    <Route {...rest} render={(props) => (
      ! user.loggedIn ? 
        <Redirect to='/login' /> : 
        ! allowedRoles || doesUserHaveAllowedRole ?
          <Component {...props} /> : 
          <Layout>
            <PageHeader title="Access Forbidden. GTFO." />
          </Layout>
    )} />
  );
}

export default PrivateRoute;