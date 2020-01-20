import React from "react";
import { Route, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, PageHeader } from "antd";

const PrivateRoute = ({
  component: Component,
  user,
  allowedRoles,
  ...rest
}) => {
  const doesUserHaveAllowedRole = allowedRoles.find(role => role === user.role);
  return (
    <Route
      {...rest}
      render={props =>
        !user.loggedIn ? (
          <Redirect to="/login" />
        ) : !allowedRoles || doesUserHaveAllowedRole ? (
          <Component {...props} />
        ) : (
          <Layout>
            <PageHeader title="Access Forbidden" />
          </Layout>
        )
      }
    />
  );
};

export default PrivateRoute;
