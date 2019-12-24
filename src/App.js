
import React from 'react';
import { connect } from 'react-redux'
import { PublicRoute, PrivateRoute, Sidebar } from './components';
import * as Pages from './pages'
import routes from './config/routes';
import { Layout } from 'antd';

const AppPresentation = ({ children }) =>
  <Layout style={{ minHeight: '100vh', minWidth: '100vw'}}>
    {children}
  </Layout>

const App = ({ user }) => {

  const PublicRoutes = () => routes.public.map(route => {
    const CurrentComponent = Pages[route.name] || <div>Welcome 2 larryprez</div>
    return (
      <PublicRoute
        exact={route.exact}
        path={route.route}
        component={(props) => <CurrentComponent {...props} />}
        key={`navroute-${route.route}`}
    />);    
  });

  const PrivateRoutes = () => routes.private.map(route => {
    const CurrentComponent = Pages[route.name] || Pages.LandingPage;
    return (
      <PrivateRoute
        exact={route.exact}
        path={route.route}
        component={(props) => <CurrentComponent {...props} />}
        key={`navroute-${route.route}`}
        user={user}
        allowedRoles={route.allowedRoles}
      />
  )})
    
  const App = (
    ! user.loggedIn ? 
      <PublicRoutes /> :
        <AppPresentation>
          <Sidebar />
          <PrivateRoutes />
        </AppPresentation>  
  );

  return App;
}

function mapStateToProps(state) {
	return {
    user: state.user
  };
}

export default connect(
	mapStateToProps,
	null,
)(App);