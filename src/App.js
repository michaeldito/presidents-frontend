
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as Screens from './screens'
import routes from './config/routes';
import Modal from './components/Modal';
import axios from 'axios';
import GameSocket from './socket/receiver';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faUserCircle)


// Indicate to the API that all requests for this app are AJAX
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Set the baseURL for all requests to the API domain instead of the current domain
axios.defaults.baseURL = `http://localhost:8080/api/v1`;
// Allow the browser to send cookies to the API domain (which include auth_token)
axios.defaults.withCredentials = true;

// const PrivateRoute = ({ component: Component, user, ...rest }) => {
//   return (
//     <Route {...rest} render={(props) => (
//       !user.loggedIn
//         ? <Redirect to='/login' />
//         : <Component {...props} />
//     )} />
//   );
// }
 
// const PublicOnlyRoute = ({ component: Component, user, ...rest}) => (
//   <Route {...rest} render={(props) => (
//     user.loggedIn
//       ? <Redirect to='/' />
//       : <Component {...props} />
//   )} />
// );


export default class App extends Component {
  render() {
    const { user } = this.props;
    const Routes = routes.map(route => {
      const CurrentComponent = Screens[route.name] || Screens.Welcome;
      // if (route.private) {
      //   return (
      //     <PrivateRoute
      //       exact={route.exact}
      //       path={route.route}
      //       component={(props) => <CurrentComponent {...props} />}
      //       key={`navroute-${route.route}`}
      //       user={user}
      //     />
      //   )
      // }
      // if (route.publicOnly) {
      //   return (
      //     <PublicOnlyRoute
      //       exact={route.exact}
      //       path={route.route}
      //       component={(props) => <CurrentComponent {...props} />}
      //       key={`navroute-${route.route}`}
      //       user={user}
      //   />);
      // }
      return (
        <Route
          exact={route.exact}
          path={route.route}
          component={(props) => <CurrentComponent {...props} />}
          key={`navroute-${route.route}`}
          user={user}
      />);
    });
      
    return (
      <React.Fragment>
        {Routes}
        <Modal />
        <GameSocket />
      </React.Fragment>
    )
  }
}

