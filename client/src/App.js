import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hub from './components/layout/Hub';
import Landing from './components/layout/Landing';
import Dashboard from './components/layout/Dashboard';
import PrivateRoute from './components/utility/PrivateRoute';
import CreateProfile from './components/Profile/CreateProfile';
import Social from './components/social/Social';

import './App.css';
import Register from './components/layout/Register';
import Login from './components/layout/Login';

//check fror token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token to get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and authenticated
  store.dispatch(setCurrentUser(decoded));

  //check if toekn expired
  const currentTIme = Date.now() / 1000;
  if (decoded.exp < currentTIme) {
    //logout
    store.dispatch(logoutUser());

    //redir to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <PrivateRoute path="/hub" component={Hub} />
              <PrivateRoute path="/profile" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute exact path="/social" component={Social} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
            <Footer />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
