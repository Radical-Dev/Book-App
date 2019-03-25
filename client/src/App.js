import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hub from './components/layout/Hub';
import Landing from './components/layout/Landing';

import './App.css';
import Register from './components/layout/Register';
import Login from './components/layout/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/hub" component={Hub} />
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
