
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
import * as Pages from './pages'
import routes from './config/routes';
import axios from 'axios';
import { Layout} from 'antd';
import Sidebar from './components/Sidebar';
import LoadingBar from 'react-redux-loading-bar'

// Indicate to the API that all requests for this app are AJAX
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Set the baseURL for all requests to the API domain instead of the current domain
axios.defaults.baseURL = `http://localhost:8080/api/v1`;
// Allow the browser to send cookies to the API domain (which include auth_token)
axios.defaults.withCredentials = true;

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      ! user.loggedIn
        ? <Redirect to='/login' />
        : <Component {...props} />
    )} />
  );
}
 
const PublicRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} 
    render={(props) => (<Component {...props} />)}
  />
);

let AppPresentation = ({children}) => (
  <Layout style={{ minHeight: '100vh' }}>
    {children}
  </Layout>
)

class App extends Component {
  render() {
    const user = this.props.user || {loggedIn: false};

    const PublicRoutes = routes.public.map(route => {
      const CurrentComponent = Pages[route.name] || <div>Welcome 2 larryprez</div>
      return (
        <PublicRoute
          exact={route.exact}
          path={route.route}
          component={(props) => <CurrentComponent {...props} />}
          key={`navroute-${route.route}`}
          user={user}
      />);    
    });

    const PrivateRoutes = routes.private.map(route => {
      const CurrentComponent = Pages[route.name] || Pages.LandingPage;
      return (
        <PrivateRoute
          exact={route.exact}
          path={route.route}
          component={(props) => <CurrentComponent {...props} />}
          key={`navroute-${route.route}`}
          user={user}
        />
    )})
      
    return (
      <React.Fragment>

        <LoadingBar />
        
        {! user.loggedIn ? PublicRoutes : null}

        {user.loggedIn ? <AppPresentation>
          <Sidebar />
          {PrivateRoutes}
        </AppPresentation> : <div></div>}

      </React.Fragment>
    )
  }
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