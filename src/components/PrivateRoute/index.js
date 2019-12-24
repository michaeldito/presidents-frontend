import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, PageHeader } from 'antd';

const PrivateRoute = ({ component: Component, user, allowedRoles, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      ! user.loggedIn ? 
        <Redirect to='/login' /> : 
        allowedRoles.find(role => role === user.role) ?
          <Component {...props} /> : 
          <Layout>
            <PageHeader title="Access Forbidden. GTFO." />
          </Layout>
    )} />
  );
}

export default PrivateRoute;